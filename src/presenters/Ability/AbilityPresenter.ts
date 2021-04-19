import {Presenter} from "@Presenters/Presenter";
import {IReq, IRes} from "@Presenters/Ability/types";
import AbilityParser from "@Domain/utils/AbilityParser/AbilityParser";

export default class AbilityPresenter extends Presenter<IRes> {
    constructor(
        private req: IReq,
        private abilityParser: AbilityParser
    ) {
        super();
    }

    async handle() {
        const uri = this.abilityParser
            .parse(this.req.params.abilityStr)
            .getUri()

        return this.httpResponse.redirect(uri)

        // try {
        //     const uri = this.abilityParser
        //         .parse(this.req.params.abilityStr)
        //         .getUri()
        //
        //     console.log('redirecting to...'.yellow.bold)
        //     console.log(uri)
        //
        //     return this.httpResponse.redirect(uri)
        // } catch (e) {
        //     console.log(e)
        //     return this.httpResponse.notFound();
        // }
    }
}
