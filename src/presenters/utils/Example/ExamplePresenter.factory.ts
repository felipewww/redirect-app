import {IReq} from "@Presenters/utils/Example/types";
import ExamplePresenter from "@Presenters/utils/Example/ExamplePresenter";

export function ExamplePresenterFactory(
    req: IReq
) {
    return new ExamplePresenter(req)
}
