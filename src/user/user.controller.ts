import { Body, Controller, Get, } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/txs')
    @ApiOperation({ summary: "Used to fetch Transactions that a User has created " })
    @ApiOkResponse({ description: 'Transactions successfully fetched' })
    async getTransactions(@Body() request: any) {
        const response = await this.userService.findTransactions(request)
        return { response }
    }

    @Get('/invoices')
    @ApiOperation({ summary: "Used to fetch Invoices that a User has created " })
    @ApiOkResponse({ description: 'Invoices successfully fetched' })
    async getInvoices(@Body() request: any) {
        const response = await this.userService.findInvoices(request)
        return { response }
    }

    @Get('/balance')
    @ApiOperation({ summary: "Used to get lightning Balance of User " })
    @ApiOkResponse({ description: 'Balance successfully received' })
    async getBalance(@Body() request: any) {
        const response = await this.userService.getBalance(request)
        return { response }
    }

}
