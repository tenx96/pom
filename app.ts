import {StringValidation,NumberValidation} from "./validators"
const validator = new StringValidation().max(5)
const numberValidator = new NumberValidation().max(5)

const valNum = numberValidator.validate(6)
console.log("VALUE ", valNum)
console.log("VALUE TYPe ", typeof valNum)

 