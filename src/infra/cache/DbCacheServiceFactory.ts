import {DbLocalCache} from "@Infra/cache/dbLocalCache";


export function DbCacheServiceFactory() {
    if (process.env.CACHE_DB_SERVICE === 'local') {
        return new DbLocalCache(
            (!JSON.parse(process.env.CACHE_DB))
        );
    } else {

        // return new RedisCache()
    }
}
