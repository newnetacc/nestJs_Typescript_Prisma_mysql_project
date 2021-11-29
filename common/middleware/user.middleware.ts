import { Injectable, NestMiddleware } from '@nestjs/common';
import { getUserFromNellyCoins } from '../helpers';
import prisma from 'common/prisma';
import { NextFunction, Request, Response } from "express";


@Injectable()
export class UserMiddleware implements NestMiddleware {


    async use(req: Request, res: Response, next: NextFunction) {


        // check user on Nelly coins
        const response = await getUserFromNellyCoins(req);


        //If an error responce is returned
        if (response.status === (500 || 400 || 201)) {
            return res.status(response.status).send({
                message: response?.message
            });
        }

        if (response.status !== 200) {
            return res.status(400).send({
                message: 'Bad Request'
            });
        }

        //check user
        if ((response.data.responseCode !== 'get_customer_details_ok') || (response.data.data.account_status !== 'confirmed')) {
            return res.status(401).send({
                message: 'Unauthorised'
            });
        }

        //check if user exist in my db
        const foundClient = await prisma.user.findFirst({
            where: { username: response.data.data.username }
        })


        req.body.id = foundClient?.id
        req.body.username = response.data.data.username
        req.body.email = response.data.data.email_address

        if (!foundClient) {
            //create user
            const result = await prisma.user.create({
                data: {
                    email: response.data.data.email_address,
                    username: response.data.data.username,
                    balance: 0
                }
            })
            req.body.id = result.id

        }






        // success
        next();
    }
}