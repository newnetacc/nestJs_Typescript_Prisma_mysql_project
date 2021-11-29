import axios from 'axios';
import { Request } from "express";
import { Response } from 'express-serve-static-core';
import { ApiClientService } from 'src/api-client/api-client.service';
import { ApiClientRequestRequestBody, ApiClientResponseBody } from 'src/api-client/entities/api-client.entity';
import { Utils } from 'util/utils';

export const getUserFromNellyCoins = async (req: Request) => {


    try {
        const response = await axios.get(`${process.env.NELLYS_COIN_SERVER_URL}/api/v1/customer/profile-details`, {
            headers: {
                'client-id': req.headers['client-key'],
                'api-key': req.headers['client-secret'],
                authorization: req.headers['authorization']
            }
        });

        return {

            status: response.status,
            message: response.statusText,
            data: response.data
        };
    } catch (error) {
        Utils.logger.error(error)
        return {
            status: error.response.status,
            message: error.response.statusText,
            data: error.response.data ?? {}
        }
    }
};

export const createUser = async (user: ApiClientRequestRequestBody, res: Response) => {
    const response: ApiClientResponseBody = await new ApiClientService().createClient(user);
    return res.status(response.status).send({
        message: response.message,
        data: response.data ? response.data : {}
    });
}