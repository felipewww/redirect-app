import {Presenter} from "@Presenters/Presenter";
import {IReq} from "@Presenters/Ability/types";
import {HttpResponse, HttpResponseFactory} from "@Presenters/httpResponse/HttpResponse";
import AbilityParser from "@Domain/utils/AbilityParser";

export default class AbilityPresenter extends Presenter {
    constructor(
        private req: IReq,
        private abilityParser: AbilityParser
    ) {
        super();
    }

    async handle(): Promise<HttpResponse> {
        const parsed = this.abilityParser.parse(this.req.params.abilityStr)

        return HttpResponseFactory.redirect({
            url: parsed.uri
        })
    }
}
