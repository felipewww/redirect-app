import "./infra/core/module-alias";
import '@Infra/core/config'
import "@Infra/webserver/bootstrap";
import AbilityParser from "@Domain/utils/AbilityParser/AbilityParser";
import {AbilityPresenterFactory} from "@Presenters/Ability/AbilityPresenter.factory";

const a = new AbilityParser()
// const res = a.parse('EF09GE18')
// const res2 = a.parse('EI09GE18')
// const res3 = a.parse('asd')

const pres = AbilityPresenterFactory(
    {
        params: {
            // abilityStr: 'EI09GE18'
            // abilityStr: 'EI09XX18'
            abilityStr: 'EIVALID'
        }
    }
)

// pres.handle()
//     .then(res => {
//         console.log(res);
//     })
//     .catch(err => {
//         console.log(err)
//     })

