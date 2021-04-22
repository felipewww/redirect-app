import {LocalCache} from "@Infra/cache/localCache";

export class DbLocalCache extends LocalCache {
    protected dir: string = __dirname + '/../../../' + '/tmp/cache-db';
}
