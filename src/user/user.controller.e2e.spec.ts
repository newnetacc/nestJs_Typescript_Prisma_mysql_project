import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { UserModule } from '../user/user.module';


describe('UserController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        // await prisma.apiClient.deleteMany({});

        const moduleRef = await Test.createTestingModule({
            imports: [UserModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    describe('GET user', () => {
        it('checks if requestbody is empty', async () => {
            const requestbody = { email: "newnetacc001@gmail.com" }
            const response = await supertest(app.getHttpServer()).get('/user/txs').send(requestbody);
            expect(response.status).toEqual(200);
            expect(response.body.response.status).toEqual(true);
            expect(response.body.response.message).toEqual('Transactions Fetched Successfully');
            expect(response.body.response.data).toBeDefined();

        });

        it('checks if requestbody is empty', async () => {
            const requestbody = { email: "newnetacc001@gmail.com" }
            const response = await supertest(app.getHttpServer()).get('/user/invoices').send(requestbody);
            expect(response.status).toEqual(200);
            expect(response.body.response.status).toEqual(true);
            expect(response.body.response.message).toEqual('Invoices Fetched Successfully');
            expect(response.body.response.data).toBeDefined();

        });
        it('checks if requestbody is empty', async () => {
            const requestbody = { email: "newnetacc001@gmail.com" }
            const response = await supertest(app.getHttpServer()).get('/user/balance').send(requestbody);
            expect(response.status).toEqual(200);
            expect(response.body.response.status).toEqual(true);
            expect(response.body.response.message).toEqual('Balance Received');
            expect(response.body.response.data).toEqual(0);

        });
    })
});

