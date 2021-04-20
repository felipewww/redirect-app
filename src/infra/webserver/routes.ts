import {Express, NextFunction, Request, Response} from "express";
import {RouteAdapter} from "@Infra/webserver/routeAdapter";
import {AbilityPresenterFactory} from "@Presenters/Ability/AbilityPresenter.factory";

export default class Routes {
    constructor(app: Express) {

        app.get('/health-check', (req: Request, res: Response, next: NextFunction) => {
            return res.json({
                name: 'health-check',
                status: true
            })
        })

        app.get(
            '/plano-de-aula/habilidade/:abilityStr',
            (req: Request, res: Response, n: NextFunction) => RouteAdapter.adapt(AbilityPresenterFactory, req, res)
        )

        // rota p/ teste em dev
        app.get('/fundamental/:year/:subject/habilidade/:ability', (req: Request, res: Response, next: NextFunction) => {
            return res.json({
                name: 'url redirecionada corretamente!',
                status: true
            })
        })

        app.get('/not-found', (req: Request, res: Response, next: NextFunction) => {
            return res.json({
                name: 'NOTFOUND!',
                status: true
            })
        })

        app.use((req: Request, res: Response, next: NextFunction) => {
            return res.json({
                name: '404',
                status: true
            })
        })

    }
}
