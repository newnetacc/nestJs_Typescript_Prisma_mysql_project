import prisma from "../../common/prisma"
import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';
import { InvoiceDecodeResponseBody, InvoiceCreateResponseBody } from './entities/invoice.entity';


describe('Testing InvoiceService', () => {
  let service: InvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceService],
    }).compile();

    service = module.get<InvoiceService>(InvoiceService);
  });

  beforeEach(async () => {
    await prisma.invoice.deleteMany({})
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an invoice', async () => {
    const data: InvoiceCreateResponseBody = await service.create({
      tokens: 50, description: "Testing"
    })
    expect(data.status).toEqual(true);
    expect(data.message).toEqual("Invoice Successfuly Created")
    expect(data.data).toBeDefined()
  })

  it('Decode an invoice', async () => {
    const data: InvoiceDecodeResponseBody = await service.decode({
      invoice: "lntb100n1psehze8pp5eh78te8r0dpv986yjtjha4zjfz0kv8kt5s0s5j7magzt7ew0lldqdqcd35kw6r5de5kueeqd4hkuetecqzpgxqr23ssp59gfmd226p3n3htjfrtmt3q6unrw6f2ryrhex54v53764fmaqjzjq9qyyssq8wf7tqw3nf85fegarr6akcpgx6lnt72jvpzel9dx02a8c223hqhy78auwjzcceqcjdz3eeyay93w686y4ukrj36nrmmn4ec6ua54qucpdmhxr7"
    })
    expect(data.status).toEqual(true);
    expect(data.message).toEqual("Invoice Successfuly Decoded")
    expect(data.data).toBeDefined()
  })

//   it('Validate an invoice', () => {

//   //   await service.decode({
//   //     invoice: "lntb50n1pseevmqpp59suu68l5p30ymq2lkpgwpeaa52vcq8ydgyz95h5hj9v7qe2v6ksqdqcd35kw6r5de5kueeqd4hkuetecqzpgxqr23ssp5ayhw6fn68zdh2304x4g79fdn2d3fy23drhprx4fap8s30tfpdsus9qyyssq2jrcueff4v0aext7klghqqygfve0yhw0wqp5m3v5gcync2appvdnmd3kcex5k0c3akznp5mnm7xh6hagf7t9053dqjv8qk3x7lcemacq6q88y9"
//   //   })
//   //   const data: InvoiceCheckResponseBody = await service.validate({
//   //     invoice: "lntb50n1pseevmqpp59suu68l5p30ymq2lkpgwpeaa52vcq8ydgyz95h5hj9v7qe2v6ksqdqcd35kw6r5de5kueeqd4hkuetecqzpgxqr23ssp5ayhw6fn68zdh2304x4g79fdn2d3fy23drhprx4fap8s30tfpdsus9qyyssq2jrcueff4v0aext7klghqqygfve0yhw0wqp5m3v5gcync2appvdnmd3kcex5k0c3akznp5mnm7xh6hagf7t9053dqjv8qk3x7lcemacq6q88y9"
//   //   })
//   //   expect(data.status).toEqual(true);
//   //   expect(data.message).toEqual("Invoice Checked Successfully")
//   //   expect(data.data).toBeDefined()
//   // })

// //   it('Pay an invoice', async () => {
// //     await service.decode({
// //       invoice: "lntb400n1psekharpp59kzj5cmtwmk0scj948g4gn3hasw9mk3lmnygcxcgxu2kd00xlm3qdqcd35kw6r5de5kueeqd4hkuetecqzpgxqr23ssp56lfp7njrmyjlzx638dyg7zpn0xxkucw4yef6k45tdl8zuhxjldcs9qyyssqrwtfqh90kqq6ksuc9d08dsnldutm0ktq2ce3670gl0a8v9x7svfzv6lt8jeyp9arcz300ydqrtlnd684sqk6lfpx2djeyczw90lgyacq2vjtjp"
// //     })
// //     await service.validate({
// //       invoice: "lntb400n1psekharpp59kzj5cmtwmk0scj948g4gn3hasw9mk3lmnygcxcgxu2kd00xlm3qdqcd35kw6r5de5kueeqd4hkuetecqzpgxqr23ssp56lfp7njrmyjlzx638dyg7zpn0xxkucw4yef6k45tdl8zuhxjldcs9qyyssqrwtfqh90kqq6ksuc9d08dsnldutm0ktq2ce3670gl0a8v9x7svfzv6lt8jeyp9arcz300ydqrtlnd684sqk6lfpx2djeyczw90lgyacq2vjtjp"
// //     })
// //     const data: InvoicePayResponseBody = await service.pay({
// //       invoice: "lntb400n1psekharpp59kzj5cmtwmk0scj948g4gn3hasw9mk3lmnygcxcgxu2kd00xlm3qdqcd35kw6r5de5kueeqd4hkuetecqzpgxqr23ssp56lfp7njrmyjlzx638dyg7zpn0xxkucw4yef6k45tdl8zuhxjldcs9qyyssqrwtfqh90kqq6ksuc9d08dsnldutm0ktq2ce3670gl0a8v9x7svfzv6lt8jeyp9arcz300ydqrtlnd684sqk6lfpx2djeyczw90lgyacq2vjtjp"
// //     })
// //     expect(data.status).toEqual(true);
// //     expect(data.message).toEqual("Invoice Successfuly Paid")
// //     expect(data.data).toBeDefined()
// //   })
});
