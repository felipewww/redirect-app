import "./core/module-alias";
import "@Core/bootstrap";
import AbilityParser from "@Domain/utils/AbilityParser";

const a = new AbilityParser()
const res = a.parse('EF09GE18')
console.log(res)
