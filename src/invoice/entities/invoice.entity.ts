export class InvoiceCreateRequestBody {
    tokens: number;
    description: string;
    email?: string;
    username?: string;
    id?:number
}
export class InvoiceCreateResponseBody {
    status: boolean;
    message: string;
    data: {};
    
}

export class InvoiceDecodeRequestBody {
    invoice: string
}
export class InvoiceDecodeResponseBody {
    status: boolean;
    message: string;
    data: {}
}

export class InvoiceCheckRequestBody {
    invoice: string;
 
}

export class InvoiceCheckResponseBody {
    
    status: boolean;
    message: string;
    data: {}

}

export class InvoicePayRequestBody {
    invoice: string;
    email?: string;
    id?: number;

}

export class InvoicePayResponseBody {
    status: boolean;
    message: string;
    data: {}
}

export class NoDataResponseBody{

    status: {};
    message: string;
    data: {}

}


