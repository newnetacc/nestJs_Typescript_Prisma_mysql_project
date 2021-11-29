import { Injectable } from '@nestjs/common';
import { ApiClientRequestRequestBody, ApiClientResponseBody } from './entities/api-client.entity';
import { Chance } from 'chance';
import * as bcrypt from 'bcrypt'
import { Utils } from '../../util/utils';
import prisma from '../../common/prisma';

@Injectable()
export class ApiClientService {
  private _chance: any = new Chance();
  private _validationResponse = {
    status: 400,
    message: ''
  };

  private async _validator(params: ApiClientRequestRequestBody): Promise<any> {
    // checking if client name was submitted but is empty
    if (!params.clientName || params.clientName === '') {
      this._validationResponse.message = 'Client name is required';
      return this._validationResponse;
    }

    // checking for existing entry for the client submitted
    const foundClient = await prisma.apiClient.findFirst({
      where: { clientName: params.clientName },
      select: { id: true }
    });

    if (foundClient) {
      this._validationResponse.status = 409;
      this._validationResponse.message = 'A key has already been generated for this client';
      return this._validationResponse;
    }

    // validation passed
    return {
      status: 200,
      message: 'Validation passed'
    };
  }

  async createClient(params: ApiClientRequestRequestBody): Promise<ApiClientResponseBody> {
    try {
      // validating request body submitted
      const validationResults = await this._validator(params);
      if (validationResults.status === 400 || validationResults.status === 409) {
        return validationResults;
      }

      // generating client key and client secret
      const clientName: string = params.clientName;
      const clientKey: string = this._chance.hash({ length: 10 });
      const clientSecret: string = this._chance.string({ length: 25 });

      // hashing the client secret
      const saltRounds: number = 10;
      const hashedClientSecret: string = await bcrypt.hash(clientSecret, saltRounds);

      // saving the client details in the database
      await prisma.apiClient.create({
        data: {
          clientName,
          clientKey,
          clientSecret: hashedClientSecret
        }
      });

      // success
      return {
        status: 201,
        message: 'Client details generated successfully',
        data: {
          clientKey,
          clientSecret: clientSecret
        }
      };
    } catch (error) {
      Utils.logger.error(error);
      return {
        status: 500,
        message: 'An error occurred while generating client key',
        data: {}
      };
    }
  }
}
