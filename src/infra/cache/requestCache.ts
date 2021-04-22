import {LocalCache} from "@Infra/cache/localCache";

export class RequestCache extends LocalCache {
    protected dir: string = __dirname + '/../../../' + '/tmp/cache-req';
}
