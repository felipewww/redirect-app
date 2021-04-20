import {IReq} from "@Presenters/utils/Example/types";
import SequencePresenter from "@Presenters/Sequence/SequencePresenter";

export function SequencePresenterFactory(
    req: IReq
) {
    return new SequencePresenter(req)
}
