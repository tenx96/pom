import pom from "./validators";

const schema = pom.number().required().min(10).max(20)


console.log(schema.validate("1"))