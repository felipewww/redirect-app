import {HttpResponse} from "@Presenters/httpResponse/HttpResponse";

export abstract class Presenter {
    public abstract async handle(): Promise<HttpResponse>;
}
