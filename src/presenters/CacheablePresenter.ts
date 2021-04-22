import {Presenter} from "@Presenters/Presenter";
import {HttpResponse, HttpResponseCache} from "@Presenters/utils/httpResponse/HttpResponse";
import {RequestCache} from "@Infra/cache/requestCache";

export interface ICacheablePresenter {
    handleCache(): any;
}

export abstract class CacheablePresenter<RESPONSE> extends Presenter<RESPONSE> {

    protected abstract cacheKey: string;
    protected requestCache: RequestCache;

    constructor(
    ) {
        super();
        this.requestCache = new RequestCache(
            (!JSON.parse(process.env.CACHE_RESPONSE))
        );
    }

    protected abstract noCacheHandler(): Promise<HttpResponse<RESPONSE>>;

    handleCache(): HttpResponse<RESPONSE> {
        const result = <HttpResponseCache>this.requestCache.get(this.cacheKey);

        if (!result) {
            return null;
        }

        return this.httpResponse.custom(result.statusCode, result.data);
    }

    async handle() {
        const result = await this.noCacheHandler();

        this.requestCache.set(this.cacheKey, result)

        return result;
    }
}
