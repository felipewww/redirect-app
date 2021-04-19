import AbilityPresenter from "@Presenters/Ability/AbilityPresenter";
import AbilityParser from "@Domain/utils/AbilityParser/AbilityParser";

export function AbilityPresenterFactory(
    req: any
) {
    return new AbilityPresenter(
        req,
        new AbilityParser()
    )
}
