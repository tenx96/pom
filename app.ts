import {StringValidation,NumberValidation,BooleanValidation} from "./validators"
const validator = new BooleanValidation().isFalse()

const valNum = validator.validate("True")
console.log("VALUE ", valNum)
console.log("VALUE TYPe ", typeof valNum)

 