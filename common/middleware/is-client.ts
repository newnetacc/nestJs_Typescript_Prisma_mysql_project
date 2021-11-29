import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import prisma from "../prisma";

@Injectable()
export class IsClient implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {

    // checking if the request came with a client key
    if (!req.headers['client-key']) {
      return res.status(401).send({
        message: 'No client key was submitted'
      });
    }

    // checking if the request came with a client secret
    if (!req.headers['client-secret']) {
      return res.status(401).send({
        message: 'No client secret was submitted'
      });
    }

    // if the request came with a key and secret, check if they are correct
    const clientKey = <string>req.headers['client-key']
    const clientSecret = <string>req.headers['client-secret'];
    const foundClient = await prisma.apiClient.findFirst({
      where: {
        clientKey
      }
    });

    // check if client key is correct
    if (!foundClient) {
      return res.status(401).send({
        message: 'Client key is invalid'
      });
    }

    // checking to make sure the client secret submitted is valid
    const response = await bcrypt.compare(clientSecret, foundClient.clientSecret);
    if (!response) {
      return res.status(401).send({
        message: 'Client secret is invalid'
      });
    }


    // success
    next();
  }
}
