import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { ApiClientModule } from './api-client.module';
import prisma from '../../common/prisma';

describe('ApiClientController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await prisma.apiClient.deleteMany({});

    const moduleRef = await Test.createTestingModule({
      imports: [ApiClientModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('POST api/v1/api-client', () => {
    it('checks if client name was submitted', async () => {
      const requestBody = { clientName: '' };

      const response = await supertest(app.getHttpServer()).post('/api/v1/api-client').send(requestBody);

      expect(response.status).toEqual(400);
      expect(response.body).toBeDefined();
      expect(response.body.message).toEqual('Client name is required');
    });

    it('checks if client details are generated successfully', async () => {
      const requestBody = { clientName: 'test' };

      const response = await supertest(app.getHttpServer()).post('/api/v1/api-client').send(requestBody);

      expect(response.status).toEqual(201);
      expect(response.body).toBeDefined();
      expect(response.body.data.clientKey).toBeDefined();
      expect(response.body.data.clientSecret).toBeDefined();
    });
  })
});
