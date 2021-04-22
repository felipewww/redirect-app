import SequencePresenter from "@Presenters/Sequence/SequencePresenter";
import {IReq} from "@Presenters/Sequence/types";
import {getSequenceFactory} from "@Domain/useCases/getSequence/getSequenceFactory";

export function SequencePresenterFactory(
    req: IReq
) {
    return new SequencePresenter(
        req.params.sequenceCode,
        getSequenceFactory(req.params.sequenceCode, req.params.sequenceTitle),
    )
}
