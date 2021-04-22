import fs from 'fs';
import {CacheService} from "@Infra/cache/cache";

export abstract class LocalCache implements CacheService {
    protected abstract dir: string;

    public constructor(
        private cacheIgnore: boolean = false
    ) {
    }

    private validateDir() {
        if (!fs.existsSync(this.dir)){
            fs.mkdirSync(this.dir);
        }
    }

    public set<T>(key: string, value: T): void {
        this.validateDir();

        const now: Date = new Date();
        const expiration: number = 604800;    // 7 dias = 60 * 60 * 24 * 7
        const dayInMilli = 1000 * expiration;
        const exp = now.getTime() + dayInMilli;
        fs.writeFileSync(`${this.dir}/${key}.exp`, JSON.stringify({ exp }));
        fs.writeFileSync(`${this.dir}/${key}.cache`, JSON.stringify(value));
    }

    public get<T>(key: string): T {

        console.log('this.cacheIgnore?????')
        console.log(this.cacheIgnore)
        if (this.cacheIgnore) {
            console.log('ignoring cache....')

            return null;
        }

        this.validateDir();

        // @ts-ignore
        // const cacheIgnore = this.cacheIgnore(process.env.PANE_ENV, process.env.NO_CACHE);
        //
        // if (cacheIgnore) {
        //     return null;
        // }

        const expFile = `${this.dir}/${key}.exp`;
        const cacheFile = `${this.dir}/${key}.cache`;
        const existsCachedFile = fs.existsSync(cacheFile);
        const existsExpFile = fs.existsSync(expFile);

        if (!existsCachedFile || !existsExpFile) {
            return null;
        }

        const now = new Date();
        const nowInMilli = now.getTime();
        const exp = JSON.parse(fs.readFileSync(expFile, 'utf-8')).exp;
        if (nowInMilli > exp) {
            fs.unlinkSync(expFile);
            fs.unlinkSync(cacheFile);
            return null;
        }

        const data = fs.readFileSync(cacheFile, 'utf-8');
        return JSON.parse(data);

    }
}
