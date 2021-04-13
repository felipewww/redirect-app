export interface HttpResponse {
    getStatusCode(): 200|201|204|301|400|403|401|404|500|501;
    data?: any;
    error?: Error
}

export class HttpResponseFactory {
    public static success(data?: any) {
        return new HttpResponseInstance(200, data);
    }

    public static redirect(data: {url: string}) {
        return new HttpResponseInstance(301, data);
    }
}

class HttpResponseInstance implements HttpResponse {
    constructor(
        private statusCode: 200|201|204|301|400|403|401|404|500|501,
        public data?: any,
        public error?: Error,
    ) {

    }

    getStatusCode(): any {
        return this.statusCode;
    }
}
