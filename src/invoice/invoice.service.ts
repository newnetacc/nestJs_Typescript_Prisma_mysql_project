import { Injectable } from '@nestjs/common';
import { InvoiceCheckRequestBody, InvoiceCheckResponseBody, InvoiceCreateRequestBody, InvoiceCreateResponseBody, InvoiceDecodeRequestBody, InvoiceDecodeResponseBody, InvoicePayRequestBody, InvoicePayResponseBody } from './entities/invoice.entity';
const axios = require("axios").default;
import { Utils } from '../../util/utils';
import { BitnobApiCall } from "../../util/apiCalls";
import prisma from '../../common/prisma';
import { v4 } from "uuid"

@Injectable()
export class InvoiceService {
  async create(request: InvoiceCreateRequestBody): Promise<InvoiceCreateResponseBody> {

    try {

      // Destructs the request body
      const { tokens, description, id, } = request

      // Axios requestdata Object
      const requestdata = {
        tokens: tokens,
        customerEmail: process.env.BITNOB_AP1_USER_EMAIL,
        description: description,
        private: false,
        is_including_private_channels: false,
        is_fallback_included: false
      }

      // Create the axios options object
      const options = BitnobApiCall(requestdata, "/createinvoice")

      //makes an API call to Bitnob  create invoice API endpoint
      const result = await axios.request(options)

      //Destruct data Object from Result Object
      const { data } = result

      //create a constant hash to store the invoice ID
      const hash = data.data.request

      //Stores the invoice in Database
      await prisma.invoice.create({
        data: {
          hash: hash,
          node: 'BITNOB',
          userId: id
        }
      })

      //Creates a RECEIVE transaction in the Database
      await prisma.transactions.create({
        data: {
          invoice: hash,
          type: "RECEIVE",
          userId: id,
          status: "pending"
        }
      })

      //Sends a Success Response to User
      return { status: true, message: "Invoice Successfuly Created", data: { invoice: hash } }

    } catch (error) {
      Utils.logger.error(error);

      //Sends Error Message to client
      return {
        status: false,
        message: 'An error occurred while creating invoice',
        data: {}
      }
    }
  }

  async decode(request: InvoiceDecodeRequestBody): Promise<InvoiceDecodeResponseBody> {

    try {

      //Destruct request object
      const { invoice } = request

      //Checks Database to see if Invoice is Present
      const result = await prisma.invoice.findFirst({
        where: {
          hash: invoice
        }
      })

      if (result) {
        if (result.decoded) {
          return { status: true, message: "Invoice Successfuly Decoded", data: result.decoded };
        } else {
          //If Invoice does not have decoded data in database

          const requestdata = {
            request: invoice
          }

          // Create the axios options object
          const options = BitnobApiCall(requestdata, "/decodepaymentrequest")

          //makes an API call to Bitnob  decode invoice API endpoint
          const apiResponse = await axios.request(options)

          //stores decoded data in Database
          await prisma.invoice.update({
            where: { id: result.id },
            data: {
              decoded: apiResponse.data
            }
          })


          // Retruns Decoded Data to User
          return { status: true, message: "Invoice Successfuly Decoded", data: apiResponse.data }
        }
      } else {
        //Invoice was not created by us
        const requestdata = {
          request: invoice
        }
        // Create the axios options object
        const options = BitnobApiCall(requestdata, "/decodepaymentrequest")

        //makes an API call to Bitnob  decode invoice API endpoint
        const apiResponse = await axios.request(options)


        //stores decoded data in Database with null user
         await prisma.invoice.create({
          data: {
            decoded: apiResponse.data,
            hash: invoice,
            node: "UNKNOWN",
          }
       })
        
        //Return Decoded Data to User
        return { status: true, message: "Invoice Successfuly Decoded", data: apiResponse.data }
      }


    } catch (error) {

      Utils.logger.error(error);

      //Sends Error Message to client
      return {
        status: false,
        message: 'An error occurred while checking invoice',
        data: {}
      }
    }
  }

  async validate(request: InvoiceCheckRequestBody): Promise<InvoiceCheckResponseBody> {

    try {

      // Destructs the request body
      const { invoice } = request


      const dbresult = await prisma.invoice.findFirst({
        where: {
          hash: invoice
        }
      })

      //creates axios request data
      const requestdata = {
        request: invoice
      }
      // Create the axios options object
      const options = BitnobApiCall(requestdata, "/initiatepayment")

      //makes an API call to Bitnob  Initial Payment  API endpoint
      const result = await axios.request(options)

      //Update Invoice with Initiate data from Bitnob
      await prisma.invoice.update({
        where: { id: dbresult?.id }, data: {
          initiate: result.data.data
        }
      })

      //Sends a Success Response to User
      return { status: result.data.status, message: "Invoice Checked Successfully", data: result.data.data }

    } catch (error) {

      Utils.logger.error(error);

      //Sends Error Message to client
      return {
        status: false,
        message: 'An error occurred while checking invoice',
        data: {}
      }
    }
  }

  async pay(request: InvoicePayRequestBody): Promise<InvoicePayResponseBody> {

    try {

      //Destruct Request Body
      const { invoice, id } = request

      //Check the database for Invoice submitted in order to find User Associated with it
      const dbinvoice = await prisma.invoice.findFirst({
        where: {
          hash: invoice
        }
      })

      //If user id Matches userId of Invoice submitted
      if (dbinvoice?.userId === id) {

        //Dont Pay
        return { status: false, message: "You cant pay an invoice created by you", data: {} }

      } else {

        //Checks if Invoice was created by Us
        if (dbinvoice?.node === "BITNOB") {

          //creates a constant for the initiate data
          const initiatedata: any = dbinvoice.initiate

          // Desctructs Initiate data to get Invoice Amount and Fees
          const { satAmount, satFee } = initiatedata

          //Calculate Total Amount to Pay
          const amounttopay = (satAmount + satFee)

          // Checks for the user in the Database
          const user = await prisma.user.findFirst({
            where: {
              id: id
            }
          })

          // If user balance is greater or equal to amount to pay
          if (user?.balance && user?.balance >= amounttopay) {

            // create a v4 uuid to be used as reference
            const reference = v4()

            //Creates request data object
            const requestdata = {

              request: invoice,
              reference: reference,
              customerEmail: process.env.BITNOB_AP1_USER_EMAIL

            }

            // Create the axios options object
            const options = BitnobApiCall(requestdata, "/pay")

            //makes an API call to Bitnob   Payment  API endpoint
            const result = await axios.request(options)


            //Create the Transaction Record
            const paymentdata = result.data.data

            await prisma.transactions.create({
              data: {
                data: paymentdata,
                type: "SEND",
                uuid: reference,
                status: "pending",
                userId: id,
                invoice: invoice
              }
            })

            //Returns success to User
            return { status: true, message: "Invoice Successfuly Paid", data: result.data }


          } else {
            // Returns a false status if The User does not have enough Balance
            return { status: false, message: "You Dont have Enough Balance to Pay this Invoice", data: {} }
          }

        } else {
          //creates a constant for the initiate data
          const initiatedata: any = dbinvoice?.initiate

          // Desctructs Initiate data to get Invoice Amount and Fees
          const { satAmount, satFee } = initiatedata

          //Calculate Total Amount to Pay
          const amounttopay = (parseInt(satAmount) + parseInt(satFee))

          const user = await prisma.user.findFirst({
            where: {
              id: id
            }
          })

          // If user balance is greater or equal to amount to pay
          if (user?.balance && user?.balance >= amounttopay) {

            // create a v4 uuid to be used as reference
            const reference = v4()


            //Creates request data object
            const requestdata = {
              request: invoice,
              reference: reference,
              customerEmail: process.env.BITNOB_AP1_USER_EMAIL

            }

            // Create the axios options object
            const options = BitnobApiCall(requestdata, "/pay")

            //makes an API call to Bitnob   Payment  API endpoint
            const result = await axios.request(options)


            //Saves transaction to database
            const paymentdata = result.data.data

            //Create the Transaction Record
            await prisma.transactions.create({
              data: {
                data: paymentdata,
                type: "SEND",
                uuid: reference,
                status: "pending",
                userId: id,
                invoice: invoice
              }
            })

            //Returns success to User
            return { status: true, message: "Invoice Successfuly Paid", data: result.data }
          }

          return { status: true, message: "You Dont have Enough Balance to Pay this Invoice", data: {} }

        }
      }
    } catch (error) {

      Utils.logger.error(error);

      //Sends Error Message to client
      return {
        status: false,
        message: 'An error occurred while Paying Invoice',
        data: {}
      }

    }

  }
}