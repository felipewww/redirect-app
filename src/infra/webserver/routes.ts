import {Express, Request, Response} from "express";
import {RouteAdapter} from "@Infra/webserver/routeAdapter";
import {AbilityPresenterFactory} from "@Presenters/Ability/AbilityPresenter.factory";
import {SequencePresenterFactory} from "@Presenters/Sequence/SequencePresenter.factory";

export default class Routes {
    constructor(app: Express) {

        app.get('/health-check', (req: Request, res: Response) => {
            return res.json({
                name: 'health-check',
                status: true
            })
        })

        app.get(
            '/plano-de-aula/habilidade/:abilityStr',
            (req: Request, res: Response) => RouteAdapter.adapt(AbilityPresenterFactory, req, res)
        )

        // endpoint PARA teste em DEV de redirecionamento
        app.get('/fundamental/:year/:subject/habilidade/:ability', (req: Request, res: Response) => {
            return res.json({
                name: 'url HABILIDADE redirecionada corretamente!',
                status: true
            })
        })

        app.get(
            '/plano-de-aula/sequencia/:sequenceTitle/:sequenceCode',
            (req: Request, res: Response) => RouteAdapter.adapt(SequencePresenterFactory, req, res)
        )

        // endpoint PARA teste em DEV de redirecionamento
        app.get('/fundamental|infantil/:year/:subject?/:sequenceTitle/:sequenceId', (req: Request, res: Response) => {
            return res.json({
                name: 'url SEQUENCIA redirecionada corretamente!',
                status: true
            })
        })

        app.get('/not-found', (req: Request, res: Response) => {
            return res.json({
                name: 'NOTFOUND!',
                status: true
            })
        })

        app.use((req: Request, res: Response) => {
            return res.json({
                name: '404',
                status: true
            })
        })

    }
}
