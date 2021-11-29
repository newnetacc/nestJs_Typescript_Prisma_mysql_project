export class ApiClientRequestRequestBody {
  clientName: string;
}

class Data {
  clientKey?: string;
  clientSecret?: string;
}

export class ApiClientResponseBody {
  status: number;
  message: string;
  data?: Data
}

export class NoDataResponseBody {
  status: number;
  message: string;
}