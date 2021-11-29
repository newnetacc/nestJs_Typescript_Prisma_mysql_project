import { Test, TestingModule } from '@nestjs/testing';
import prisma from '../../common/prisma';
import { ApiClientService } from './api-client.service';
import { ApiClientResponseBody } from './entities/api-client.entity';

describe('Testing ApiClientService', () => {
  let service: ApiClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiClientService],
    }).compile();

    service = module.get<ApiClientService>(ApiClientService);
  });

  beforeAll(async () => {
    await prisma.apiClient.deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should check if client name is empty', async () => {
    const data: ApiClientResponseBody = await service.createClient({ clientName: '' });

    expect(data.status).toEqual(400);
    expect(data.message).toEqual('Client name is required');
  });

  it('should save client details successfully', async () => {
    const data: ApiClientResponseBody = await service.createClient({ clientName: 'test' });

    expect(data.status).toEqual(201);
    expect(data.message).toEqual('Client details generated successfully');
    expect(data.data!.clientKey).toBeDefined();
    expect(data.data!.clientSecret).toBeDefined();
  });

  it('should not generate duplicate key for one client', async () => {
    const data: ApiClientResponseBody = await service.createClient({ clientName: 'test' });

    expect(data.status).toEqual(409);
    expect(data.message).toEqual('A key has already been generated for this client');
  });
});
