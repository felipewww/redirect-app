import {IReq} from "@Presenters/Example/types";
import SequencePresenter from "@Presenters/Sequence/SequencePresenter";

export function SequencePresenterFactory(
    req: IReq
) {
    return new SequencePresenter(req)
}
