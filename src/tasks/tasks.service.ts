import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import prisma from "client";
import { BitnobApiCall } from "util/apiCalls";
import axios from "axios";
import { Utils } from "util/utils";

@Injectable()
export class TaskService {

    @Cron(CronExpression.EVERY_MINUTE)
    async handleSendBalanceupdateCron() {

        try {
            // Checks Transactions Table to finds transactions that are of TYPE-SEND and STATUS-PENDING
            const dbresult = await prisma.transactions.findMany({
                where: {
                    type: "SEND", status: "pending"
                }
            })

            // Iterate the dbresults Array
            for (const value of dbresult) {
                  
                //create the request data
                const requestdata = {
                    request: value.invoice

                }
                // Create the axios options object
                const options: any = BitnobApiCall(requestdata, "/getinvoice")

                //makes an API call to Bitnob   Payment  API endpoint
                const result = await axios.request(options)


                //If status of the transaction is PAID
                if (result.data.data.status === 'paid') {

                    //Update the status of transaction in database to Paid
                    await prisma.transactions.update({
                        where: { id: value.id }, data: {
                            status: "paid"
                        }
                    })

                    //create a constant for the data which stores the amount to pay and fees
                    const initiatedata: any = value.data


                    // Desctructs Initiate data to get Invoice Amount and Fees
                    const { satAmount, satFees } = initiatedata


                    //Calculate Total Amount to Pay
                    const amounttopay = (parseInt(satAmount) + parseInt(satFees))


                    const userid: any = value.userId

                    // Decreases the senders balance by amount paid
                    await prisma.user.update({
                        where: { id: userid }, data: {
                            balance: {
                                decrement: amounttopay
                            }
                        }
                    })

                    // If status of transaction is expired
                } else if (result.data.data.status === 'expired') {

                    await prisma.transactions.update({
                        where: { id: value.id }, data: {
                            status: "expired"
                        }
                    })

                    // If status of transaction is failed
                } else if (result.data.data.status === 'failed') {
                    await prisma.transactions.update({
                        where: { id: value.id }, data: {
                            status: "failed"
                        }
                    })
                }
            }

        } catch (error) {
            Utils.logger.error(error);

            //Sends Error Message to User
            return {
                status: false,
                message: 'An error occurred at the Receive Balance Update Task Scheduler',
                data: {}
            }
        }
    }

    @Cron('*/3 * * * *')
    async handleReceiveBalanceupdateCron() {

        try {


            // Checks Transactions Table to finds transactions that are of TYPE-RECEIVE and STATUS-PENDING
            const dbresult = await prisma.transactions.findMany({
                where: {
                    type: "RECEIVE", status: "pending"
                }
            })

            
            // Iterate the dbresults Array
            for (const value of dbresult) {

                //create the request data
                const requestdata = {
                    request: value.invoice

                }
                // Create the axios options object
                const options: any = BitnobApiCall(requestdata, "/getinvoice")


                //makes an API call to Bitnob   Payment  API endpoint
                const result = await axios.request(options)


                //If status of the transaction is PAID
                if (result.data.data.status === 'paid') {

                    //Update the status of transaction in database to Paid
                    await prisma.transactions.update({
                        where: { id: value.id }, data: {
                            status: "paid"
                        }
                    })

                    //create a constant for the data which stores the amount to pay and fees
                    const tokens = result.data.data.tokens

                    //Calculate Total Amount to Pay
                    const amounttopay = (parseInt(tokens))

                    const userid: any = value.userId

                    // Decreases the senders balance by amount paid
                    await prisma.user.update({
                        where: { id: userid }, data: {
                            balance: {
                                increment: amounttopay
                            }
                        }
                    })

                    // If status of transaction is expired
                } else if (result.data.data.status === 'expired') {

                    await prisma.transactions.update({
                        where: { id: value.id }, data: {
                            status: "expired"
                        }
                    })

                    // If status of transaction is unpaid
                } else if (result.data.data.status === 'failed') {
                    await prisma.transactions.update({
                        where: { id: value.id }, data: {
                            status: "failed"
                        }
                    })
                }
            }

        } catch (error) {

            Utils.logger.error(error);

            //Sends Error Message to client
            return {
                status: false,
                message: 'An error occurred at the Receive Balance Update Task Scheduler',
                data: {}
            }
        }
    }
}