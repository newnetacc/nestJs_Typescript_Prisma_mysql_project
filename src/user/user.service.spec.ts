import { Test, TestingModule } from '@nestjs/testing';
import { UserBalanceResponseBody, UserInvoicesResponseBody, UserTransactionsResponseBody } from './entities/user';
import { UserService } from './user.service';


describe('Api UserService', () => {
  let service: UserService


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService)
  });

  // beforeEach(async () => {
  //   await prisma.user.deleteMany({})
  // })

  it('should fecth user transactions successfully', async () => {
    const data: UserTransactionsResponseBody = await service.findTransactions({
      email: "newnetacc001@gmail.com"
    });

    expect(data.message).toEqual("Transactions Fetched Successfully");
    expect(data.status).toEqual(true);

  });

  it('should fecth user transactions successfully', async () => {
    const data: UserInvoicesResponseBody = await service.findInvoices({
      email: "newnetacc001@gmail.com"
    });

    expect(data.message).toEqual("Invoices Fetched Successfully");
    expect(data.status).toEqual(true);

  });

  it('should fecth user transactions successfully', async () => {
    const data: UserBalanceResponseBody = await service.getBalance({
      email: "newnetacc001@gmail.com"
    });

    expect(data.message).toEqual("Balance Received");
    expect(data.status).toEqual(true);

  });
});
