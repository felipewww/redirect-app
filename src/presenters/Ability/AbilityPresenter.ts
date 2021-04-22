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
    }
}
