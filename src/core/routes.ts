import {Express, NextFunction, Request, Response} from "express";

export default class Routes {
    constructor(app: Express) {

        app.get('/', (req: Request, res: Response, next: NextFunction) => {
            return res.json({
                name: 'index',
                status: true
            })
        })

        app.get('/health-check', (req: Request, res: Response, next: NextFunction) => {
            return res.json({
                name: 'health-check',
                status: true
            })
        })

        app.get('/test', (req: Request, res: Response, next: NextFunction) => {
            return res.json({
                name: 'test',
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
