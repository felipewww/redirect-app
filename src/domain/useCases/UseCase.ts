export abstract class UseCase<RESPONSE> {
    constructor() {
    }

    abstract handle(): Promise<RESPONSE>;
}
