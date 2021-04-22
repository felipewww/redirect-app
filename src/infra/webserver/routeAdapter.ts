import {Request, Response} from "express";
import {Presenter} from "@Presenters/Presenter";
import {CustomError} from "@Presenters/customError";
import {DomainError} from "@Domain/utils/DomainError";
import {CacheablePresenter} from "@Presenters/CacheablePresenter";

export class RouteAdapter {

    private presenter: Presenter<any>|CacheablePresenter<any>;

    constructor(
        private presenterFactory: Function,
        private request: Request,
        private response: Response,
    ) {
        if( this.tryInstancePresenter() ) {
            this.handlePresenter()
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

            let status = 500;

            if (e instanceof CustomError) {
                status = 400;
            }

            if (status === 500 || status === 501) {
                return this.sendError(status, e)
            }

            this.response.json(e);

            return false;
        }

        return true;
    }

    private async handlePresenter() {

        if (this.presenter instanceof CacheablePresenter) {
            const hasResponseCached = await this.presenter.handleCache();
            if (hasResponseCached) {
                if (process.env.APP_ENV === 'dev') {
                    console.log('handling from cache'.yellow.bold)
                }

                this.response.status(hasResponseCached.statusCode);
                return this.response.json(hasResponseCached.data);
            }
        }

        try {
            const result = await this.presenter.handle();

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

                    return this.response.redirect(301, domain+result.data.uri)

                case 404:
                    this.response.status(404);
                    break;

                default:
                    jsonResponse.error = result.error;
            }

            this.response.json(jsonResponse);

        } catch (err) {
            let status: 500|400 = 500;

            if (err instanceof DomainError) {
                status = 400;
            }

            this.sendError(status, err);
        }
    }

    private sendError(code: 500|501|400, err: Error) {
        if (process.env.APP_ENV === 'dev') {
            console.log('HANDLE PRESENTER ERROR'.bgYellow.black.bold)
            console.log(err)
        }

        this.response.sendStatus(code);
    }
}
