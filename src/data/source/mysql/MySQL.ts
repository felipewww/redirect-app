import Knex from "knex";
import {Filterable} from "@Data/source/mysql/utils/QueryFilters/Filterable";
import {FilterWhere} from "@Data/source/mysql/utils/QueryFilters/FilterWhere";
import {CacheService} from "@Infra/cache/cache";
import {DbCacheServiceFactory} from "@Infra/cache/DbCacheServiceFactory";

export abstract class MySQL {
    protected builder: Knex;
    protected filters: Array<Filterable>;
    protected abstract table: string;
    public alias: string;

    protected getOrderColName: string = 'id';
    protected getOrderDir: string = 'desc';

    public transaction: Knex.Transaction;

    public cache: CacheService

    protected _withCache = false
    protected _cacheKey: string;

    constructor() {

        this.cache = DbCacheServiceFactory()

        const connection = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        }

        this.builder = Knex({
            client: 'mysql2',
            connection,
            pool: {
                min: 0,
                max: 1
            }
        });
    }

    public withCache(key: string) {
        this._withCache = true;
        this._cacheKey = key;

        return this;
    }

    public async withTransaction(transaction?: Knex.Transaction) {
        if (transaction) {
            this.transaction = transaction;
        } else {
            this.transaction = await this.builder.transaction();
        }

        return this;
    }

    public withFilters(filters: Array<Filterable>) {
        this.filters = filters;
    }

    protected clearFilters() {
        this.filters = [];
    }

    protected clear() {
        this.builder.clearWhere();
        this.builder.clearSelect();

        this.clearFilters();
    }

    async get(cols?: any): Promise<Array<any>> {

        if (!cols) {
            cols = '*';
        }

        let query = this.builder
            .table(this.getTableName())
            .select(cols);

        if (this.getOrderColName) {
            query.orderBy(this.table+'.'+this.getOrderColName, this.getOrderDir);
        }

        return this.exec(query);
    }

    async save(data: any, id: number): Promise<number> {
        this.withFilters([
            new FilterWhere('id', id)
        ]);

        let query = this.builder
            .table(this.table)
            .update(data)
            .returning('id');

        return this.exec<number>(query);
    }

    async store(data: any): Promise<number> {
        let query =  this.builder
            .table(this.table)
            .insert(data, 'id')

        return this.exec<number>(query);
    }

    protected async exec<T extends any>(query: Knex.QueryBuilder): Promise<T> {
        if (this._withCache) {
            const result = this.cache.get(this._cacheKey)

            if (result) {
                // @ts-ignore
                return Promise.resolve(result);
            }
        }

        if (this.filters && this.filters.length) {
            this.filters.forEach((filter: Filterable) => {
                filter.apply(query);
            });
        }

        if (this.transaction) {
            query.transacting(this.transaction);
        }

        if (this._withCache) {
            query.then((result: any) => {
                this.cache.set(this._cacheKey, result)
            });
        }

        return query;
    }

    async delete(filters: Array<Filterable>) {
        this.withFilters(filters);

        let query = this.builder
            .table(this.table)
            .delete('id')

        return this.exec(query);
    }

    protected getTableName() {
        if (this.alias) {
            return this.table + ' AS ' + this.alias
        }

        return this.table;
    }

    protected col(name: string) {
        if (this.alias) {
            return this.alias+'.'+name;
        } else {
            return this.table+'.'+name;
        }
    }
}
