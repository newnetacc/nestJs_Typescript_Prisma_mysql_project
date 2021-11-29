import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { InvoiceModule } from './invoice.module';

describe('ApiClientController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // await prisma.apiClient.deleteMany({});

    const moduleRef = await Test.createTestingModule({
      imports: [InvoiceModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('POST invoice', () => {
    it('checks if requestbody is empty', async () => {
      const requestBody = { tokens: 50, description: "test"};

      const response = await supertest(app.getHttpServer()).post('/invoice/create').send(requestBody);
      expect(response.status).toEqual(201);
      expect(response.body).toBeDefined();
      expect(response.body.status).toEqual(true);
      expect(response.body.message).toEqual("Invoice Successfuly Created");
    });

    it('Decodes invoice', async () => {
      const requestBody = { invoice: "lntb50n1pseevmqpp59suu68l5p30ymq2lkpgwpeaa52vcq8ydgyz95h5hj9v7qe2v6ksqdqcd35kw6r5de5kueeqd4hkuetecqzpgxqr23ssp5ayhw6fn68zdh2304x4g79fdn2d3fy23drhprx4fap8s30tfpdsus9qyyssq2jrcueff4v0aext7klghqqygfve0yhw0wqp5m3v5gcync2appvdnmd3kcex5k0c3akznp5mnm7xh6hagf7t9053dqjv8qk3x7lcemacq6q88y9" };

      const response = await supertest(app.getHttpServer()).post('/invoice/decode').send(requestBody);

      expect(response.status).toEqual(201);
      expect(response.body).toBeDefined();
      expect(response.body.message).toEqual('Invoice Successfuly Decoded');
      expect(response.body.status).toEqual(true);
    });
    // it('Validate an invoice', async () => {
    //   const requestBody = { invoice: "lntb50n1pseevmqpp59suu68l5p30ymq2lkpgwpeaa52vcq8ydgyz95h5hj9v7qe2v6ksqdqcd35kw6r5de5kueeqd4hkuetecqzpgxqr23ssp5ayhw6fn68zdh2304x4g79fdn2d3fy23drhprx4fap8s30tfpdsus9qyyssq2jrcueff4v0aext7klghqqygfve0yhw0wqp5m3v5gcync2appvdnmd3kcex5k0c3akznp5mnm7xh6hagf7t9053dqjv8qk3x7lcemacq6q88y9" };

    //   const response = await supertest(app.getHttpServer()).post('/invoice/validate').send(requestBody);

    //   expect(response.status).toEqual(201);
    //   expect(response.body).toBeDefined();
    //   expect(response.body.message).toEqual('Invoice Checked Successfully');
    //   expect(response.body.status).toEqual(true);
    // });

    // it('Pay Invoice', async () => {
    //   const requestBody = { invoice: "llntb50n1pseevmqpp59suu68l5p30ymq2lkpgwpeaa52vcq8ydgyz95h5hj9v7qe2v6ksqdqcd35kw6r5de5kueeqd4hkuetecqzpgxqr23ssp5ayhw6fn68zdh2304x4g79fdn2d3fy23drhprx4fap8s30tfpdsus9qyyssq2jrcueff4v0aext7klghqqygfve0yhw0wqp5m3v5gcync2appvdnmd3kcex5k0c3akznp5mnm7xh6hagf7t9053dqjv8qk3x7lcemacq6q88y9" };

    //   const response = await supertest(app.getHttpServer()).post('/invoice/pay').send(requestBody);

    //   expect(response.status).toEqual(201);
    //   expect(response.body).toBeDefined();
    //   expect(response.body.message).toEqual('You Dont have Enough Balance to Pay this Invoice');
    //   expect(response.body.status).toEqual(true);
    // });
  })
});
