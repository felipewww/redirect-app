import {HttpResponse, HttpResponseFactory} from "@Presenters/httpResponse/HttpResponse";

export abstract class Presenter<RESPONSE> {

    protected httpResponse: HttpResponseFactory<RESPONSE>

    constructor() {
        this.httpResponse = new HttpResponseFactory();
    }

    public abstract handle(): Promise<HttpResponse<RESPONSE>>;
}
