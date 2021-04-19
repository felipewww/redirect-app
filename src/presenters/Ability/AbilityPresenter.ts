import {Presenter} from "@Presenters/Presenter";
import {IReq} from "@Presenters/Ability/types";
import {HttpResponse, HttpResponseFactory} from "@Presenters/httpResponse/HttpResponse";
import AbilityParser from "@Domain/utils/AbilityParser/AbilityParser";

export default class AbilityPresenter extends Presenter {
    constructor(
        private req: IReq,
        private abilityParser: AbilityParser
    ) {
        super();
    }

    async handle(): Promise<HttpResponse> {
        try {
            const uri = this.abilityParser
                .parse(this.req.params.abilityStr)
                .getUri()

            return HttpResponseFactory.redirect({
                url: uri
            });
        } catch (e) {
            // console.log(e)
            return HttpResponseFactory.notFound();
        }
    }
}
