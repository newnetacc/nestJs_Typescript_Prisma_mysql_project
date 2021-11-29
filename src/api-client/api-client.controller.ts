import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiClientService } from './api-client.service';
import { ApiClientRequestRequestBody, ApiClientResponseBody, NoDataResponseBody } from './entities/api-client.entity'

@ApiTags('clients')
@Controller('api/v1/api-client')
export class ApiClientController {
  constructor(private readonly apiClientService: ApiClientService) { }

  @Post()
  @ApiOperation({ summary: 'Used to create an account(key and secret) for any external service that would want to consume any of the APIs within this microservice' })
  @ApiCreatedResponse({ description: 'Service account successfully created', type: ApiClientResponseBody })
  @ApiBadRequestResponse({ description: 'Bad Request: Validation error', type: NoDataResponseBody })
  @ApiConflictResponse({ description: 'Conflict: A service with same account name exists', type: NoDataResponseBody })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: NoDataResponseBody })
  async create(@Body() requestBody: ApiClientRequestRequestBody, @Res() res: Response) {
    const response: ApiClientResponseBody = await this.apiClientService.createClient(requestBody);

    return res.status(response.status).send({
      message: response.message,
      data: response.data ? response.data : {}
    });
  }
}
