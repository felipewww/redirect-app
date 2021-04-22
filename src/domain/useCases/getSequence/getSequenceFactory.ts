import {GetSequence} from "@Domain/useCases/getSequence/getSequence";
import {SequenceRepoFactory} from "@Domain/repositories/factories/SequenceRepoFactory";

export function getSequenceFactory(id: number, title: string) {
    return new GetSequence(
        id,
        title,
        SequenceRepoFactory()
    )
}
