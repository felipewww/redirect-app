import {Request, Response} from "express";
import {Presenter} from "@Presenters/Presenter";
import {CustomError} from "@Presenters/customError";
import {DomainError} from "@Domain/utils/DomainError";
import {CacheablePresenter} from "@Presenters/CacheablePresenter";
import {HttpResponse} from "@Presenters/utils/httpResponse/HttpResponse";

export class RouteAdapter {

    private presenter: Presenter<any>|CacheablePresenter<any>;

    constructor(
        private presenterFactory: Function,
        private request: Request,
        private response: Response,
    ) {
        if( this.tryInstancePresenter() ) {
            this.handleRequest()
                .catch(err => {
                    console.log('fatal error'.red.bold, err)
                    this.response.status(500);
                })
        }
    }

    public static adapt(
        presenterFactory: Function,
        req: Request,
        res: Response,
    ) {
        return new RouteAdapter(presenterFactory, req, res)
    }

    private tryInstancePresenter() {
        try {
            this.presenter = this.presenterFactory(this.request, this.response.locals.session)
        } catch (e) {

            let status: 500|400 = 500;

            if (e instanceof CustomError) {
                status = 400;
            }

            return this.sendError(status, e)
        }

        return true;
    }

    private async handleRequest() {

        try {
            const httpResponse = await this.executePresenterHandler();
            this.adaptHttpResponseToExpress(httpResponse);
        } catch (err) {
            let status: 500|400 = 500;

            if (err instanceof DomainError) {
                status = 400;
            }

            this.sendError(status, err);
        }
    }

    private async executePresenterHandler() {
        let response: HttpResponse<any>;

        if (this.presenter instanceof CacheablePresenter) {
            response = await this.presenter.handleCache();
            if (response) {
                if (process.env.APP_ENV === 'dev') {
                    console.log('handling from cache'.yellow.bold)
                }
            } else {
                response = await this.presenter.handle();
            }
        } else {
            response = await this.presenter.handle();
        }

        return response;
    }

    private adaptHttpResponseToExpress(response: HttpResponse<any>) {
        let jsonResponse: any = {};

        this.response.status(response.getStatusCode());

        switch (response.getStatusCode()) {
            case 200:
                jsonResponse.data = response.data;
                break;

            case 301:
                return this.response.redirect(301, process.env.REDIRECTION_DOMAIN + response.data.uri)

            case 404:
                this.response.status(404);
                break;

            default:
                jsonResponse.error = response.error;
        }

        this.response.json(jsonResponse);
    }

    private sendError(code: 500|501|400, err: Error) {
        if (process.env.APP_ENV === 'dev') {
            console.log('HANDLE PRESENTER ERROR'.bgYellow.black.bold)
            console.log(err)
        }

        this.response.sendStatus(code);
    }
}
