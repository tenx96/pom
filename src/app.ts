import pom from "./validators";
const schema = pom.array(pom.string().min(2));
console.log(schema.validate(["ab", "bc", 1]));
