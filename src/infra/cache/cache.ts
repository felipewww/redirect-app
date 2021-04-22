export interface CacheService {
    set<T>(key: string, value: T): void
    get<T>(key: string): T
}
