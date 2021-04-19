import {Presenter} from "@Presenters/Presenter";
import {IReq, IRes} from "@Presenters/Example/types";

export default class ExamplePresenter extends Presenter<IRes> {
    constructor(
        private req: IReq,
    ) {
        super();
    }

    async handle() {
        try {
            // some logic...
            console.log(this.req.params.someParam)
            return this.httpResponse.success({
                status: true
            })
        } catch (e) {
            // console.log(e)
            return this.httpResponse.notFound();
        }
    }
}
