import { Injectable } from '@nestjs/common';
import { UserBalanceResponseBody, UserInvoicesResponseBody, UserTransactionsResponseBody } from './entities/user';
import { Utils } from '../../util/utils';
import prisma from '../../common/prisma';

@Injectable()
export class UserService {

    async findTransactions(request: any): Promise<UserTransactionsResponseBody> {
        try {
            //Descruct request body from middleware
            const { email } = request

            //Checks database to find users Transactions
            const dbrespose = await prisma.user.findUnique({
                where: {
                    email: email
                }, include: {
                    transactions: true
                }
            })

            // Stores users Transactions Array in a constant
            const txsresponse: any = dbrespose?.transactions

            // Loops through transactions Array to send specific info to user
            const newresponse = txsresponse.map((item: any) => {
                return { "id": item.id, "invoice": item.invoice, "Amount": item.data?.satAmount, "Fee": item.data?.satFees }
            })

            // Success
            return {
                status: true, message: "Transactions Fetched Successfully", data: newresponse
            }

            // Error
        } catch (error) {
            Utils.logger.error(error);
            return {
                status: false,
                message: 'An error occurred while finding Transactions',
                data: []
            }
        }
    }

    async findInvoices(request: any): Promise<UserInvoicesResponseBody> {
        try {

            //Descruct request body from middleware
            const { email } = request

            //Checks database to find users Transactions
            const dbrespose = await prisma.user.findUnique({
                where: {
                    email: email
                }, include: {
                    invoice: true
                }
            })

            // Stores users Transaction in a constant
            const invoiceresponse: any = dbrespose?.invoice

            // Loops through Invoices Array to send specific info to user
            const newresponse = invoiceresponse.map((item: any) => {
                return { "id": item.id, "Fees": item.initiate?.satFee, "Amount": item.initiate?.satAmount, "Description": item.initiate?.description, "invoice": item.hash }
            })

            //Success
            return {
                status: true, message: "Invoices Fetched Successfully", data: newresponse
            }

        } catch (error) {
            Utils.logger.error(error);
            return {
                status: false,
                message: 'An error occurred while finding Transactions',
                data: []
            }
        }
    }

    async getBalance(request: any): Promise<UserBalanceResponseBody> {

        try {

            //Destruct Request Body
            const { email } = request

            //Finds Users email from the database
            const dbrespose = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            //Stores the balance of the user in a constant
            const userbalance = dbrespose?.balance

            //Success
            return {
                status: true, message: "Balance Received", data: userbalance
            }

            //Error Message
        } catch (error) {
            Utils.logger.error(error);
            return {
                status: false,
                message: 'An error occurred while finding User Balance',
                data: 0
            }
        }
    }
}






