import {Repository} from "@Domain/repositories/Repository";
import {SequenceDto} from "@Domain/useCases/getSequence/types";
import {SequenceModel} from "@Data/source/mysql/SequenceModel";

export class SequenceRepo extends Repository {
    constructor(
        private model: SequenceModel
    ) {
        super();
    }

    async getById(id: number): Promise<SequenceDto> {
        const res = await this.model.withCache(id.toString()).get()
        return res[0]
    }

    async getStage(id: number): Promise<Array<SequenceDto>> {
        const result = await this.model.getStage(id)
        return result;
    }
}
