import {GetSequence} from "@Domain/useCases/getSequence/getSequence";
import {CacheablePresenter, ICacheablePresenter} from "@Presenters/CacheablePresenter";

export default class SequencePresenter extends CacheablePresenter<any> implements ICacheablePresenter {

    protected cacheKey: string;

    constructor(
        private sequenceCode: number,
        private getSequenceUseCase: GetSequence,
    ) {
        super();
        this.cacheKey = 'seq-'+this.sequenceCode;
    }

    async noCacheHandler() {
        const result = await this.getSequenceUseCase.handle();

        return this.httpResponse.redirect(result.uri)
    }
}
