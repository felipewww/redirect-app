import {IReq} from "@Presenters/Example/types";
import ExamplePresenter from "@Presenters/Example/ExamplePresenter";

export function ExamplePresenterFactory(
    req: IReq
) {
    return new ExamplePresenter(req)
}
