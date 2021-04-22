export abstract class UseCase<RESPONSE> {
    constructor() {
    }

    abstract async handle(): Promise<RESPONSE>;
}
