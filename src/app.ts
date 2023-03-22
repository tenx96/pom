import pom from './validators'
const schema = pom.array(pom.number().min(5)).required()
console.log(schema.validate([2]))
// if a is not in string then min is 2 and max is 5
