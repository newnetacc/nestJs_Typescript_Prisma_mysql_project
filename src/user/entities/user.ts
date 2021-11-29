import { Transactions,Invoice } from ".prisma/client";

export class UserTransactionsResponseBody {
    status: boolean;
    message: string;
    data: Array<Transactions>
}

export class UserInvoicesResponseBody {
    status: boolean;
    message: string;
    data: Array<Invoice>
}


export class UserBalanceResponseBody{
    status: boolean;
    message: string;
    data: Number | undefined;
}

