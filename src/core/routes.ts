import {Express, NextFunction, Request, Response} from "express";

export default class Routes {
    constructor(app: Express) {

        app.get('/test', (req: Request, res: Response, next: NextFunction) => {
            return res.json({
                status: true
            })
        })

    }
}
