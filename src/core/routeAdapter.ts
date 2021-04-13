import {Request, Response} from "express";
import {Presenter} from "@Presenters/Presenter";
import {CustomError} from "@Presenters/customError";
import {HttpResponse} from "@Presenters/httpResponse/HttpResponse";

export class RouteAdapter {

    private presenter: Presenter;

    constructor(
        private presenterFactory: Function,
        private request: Request,
        private response: Response,
    ) {
        if( this.tryInstancePresenter() ) {
            this.handlePresenter();
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

            let status = 500;

            if (e instanceof CustomError) {
                status = 400;
            }

            if (status === 500 || status === 501) {
                return this.unexpectedError(status, e)
            }

            this.response.json(e);

            return false;
        }

        return true;
    }

    private handlePresenter() {
        this.presenter.handle()
            .then((result: HttpResponse) => {
                let jsonResponse: any = {};

                this.response.status(result.getStatusCode());

                switch (result.getStatusCode()) {
                    case 200:
                        jsonResponse.data = result.data;
                        break;

                    case 301:
                        const domain = (process.env.APP_ENV === 'production')
                            ? 'https://planosdeaula.novaescola.org.br'
                            : '';

                        this.response.status(301);
                        this.response.redirect(domain+result.data.url, 301)
                        break;

                    case 404:
                        this.response.status(404);
                        break;

                    default:
                        jsonResponse.error = result.error;
                }

                this.response.json(jsonResponse);
            })
            .catch((err: any) => {
                this.unexpectedError(500, err)
            })
    }

    private unexpectedError(code: 500|501, err: Error) {
        if (process.env.APP_ENV === 'dev') {
            console.log('handlePresenter'.bgRed.white)
            console.log(err)
        }

        this.response.sendStatus(code);
    }
}
