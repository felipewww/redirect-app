import {SequenceRepo} from "@Domain/repositories/SequenceRepo";
import {SequenceModel} from "@Data/source/mysql/SequenceModel";

export function SequenceRepoFactory() {
    return new SequenceRepo(new SequenceModel())
}
