import {UseCase} from "@Domain/useCases/UseCase";
import {IResponse} from "@Domain/useCases/getSequence/types";
import {SequenceRepo} from "@Domain/repositories/SequenceRepo";

export class GetSequence extends UseCase<IResponse> {

    constructor(
        private id: number,
        private title: string,
        private repo: SequenceRepo,
    ) {
        super();
    }

    async handle() {
        const sequence = await this.repo.getStage(this.id)
        const mainUri = this.mainSliceUri(sequence[0].year, sequence[0].uri)
        const finalUri = mainUri + '/' + this.title + '/' + this.id

        return Promise.resolve({uri: finalUri});
    }

    /**
     * parte da URL que precisamos redirecioanr está salva no banco de dados como urlV2,
     * quando é "fundamental" precisa da disciplina, quando é infantil não precisa.
     * @private
     */
    private mainSliceUri(year: number, uri: string) {
        let uriPartsCount = 2;
        if (year > 0) {
            uriPartsCount = 3
        }

        const uriToArray = uri.split('/');
        const parts = []

        let i = 1;
        while (i <= uriPartsCount){
            parts.push(uriToArray[i])
            i++;
        }

        return '/' + parts.join('/')
    }
}
