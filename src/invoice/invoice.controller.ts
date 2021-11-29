import { Controller, Post, Body } from '@nestjs/common';
import { InvoiceCheckRequestBody, InvoiceCreateRequestBody, InvoiceDecodeRequestBody, InvoicePayRequestBody, NoDataResponseBody } from './entities/invoice.entity';
import { InvoiceService } from './invoice.service';
import { ApiTags, ApiOperation, ApiInternalServerErrorResponse } from '@nestjs/swagger';


@ApiTags('Invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @Post('create')
  @ApiOperation({ summary: "Used to Create Invoices on the Lightning Service " })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: NoDataResponseBody })
  create(@Body() request: InvoiceCreateRequestBody) {
    return this.invoiceService.create(request);
  }

  @Post('decode')
  @ApiOperation({ summary: "Used to Decode Invoices on the Lightning Service " })
  decode(@Body() request: InvoiceDecodeRequestBody) {
    return this.invoiceService.decode(request);
  }

  @Post('validate')
  @ApiOperation({ summary: "Used to Check Invoices on the Lightning Service " })
  check(@Body() request: InvoiceCheckRequestBody) {
    return this.invoiceService.validate(request);
  }

  @Post('pay')
  @ApiOperation({ summary: "Used to Pay Invoices on the Lightning Service " })
  pay(@Body() request: InvoicePayRequestBody,) {
    return this.invoiceService.pay(request);
  }
}
