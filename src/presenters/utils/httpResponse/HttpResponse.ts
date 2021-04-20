export interface HttpResponse<DATA> {
    getStatusCode(): 200|201|204|301|400|403|401|404|500|501;
    data?: DATA;
    error?: Error
}

class HttpResponseInstance<DATA> implements HttpResponse<DATA> {
    constructor(
        private statusCode: 200|201|204|301|400|403|401|404|500|501,
        public data?: DATA,
        public error?: Error,
    ) {

    }

    getStatusCode(): any {
        return this.statusCode;
    }
}

export class HttpResponseFactory<RESPONSE> {

    public success(data: RESPONSE, code: 200|201|204 = 200): HttpResponse<RESPONSE> {
        return new HttpResponseInstance(200, data);
    }

    public redirect(uri: string): HttpResponse<{ uri: string }> {
        return new HttpResponseInstance(301, {uri});
    }

    public notFound(): HttpResponse<null> {
        return new HttpResponseInstance(404);
    }

    public internalServerError(e: Error): HttpResponse<any> {
        return new HttpResponseInstance(500);
    }

    public badRequest(e: Error): HttpResponse<any> {
        return new HttpResponseInstance(400);
    }

    public unauthorized(e?: Error): HttpResponse<any> {
        return new HttpResponseInstance(401);
    }

    public notImplemented() {
        return new HttpResponseInstance(501);
    }
}
