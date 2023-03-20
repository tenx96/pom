import pom from './validators'
const schema = pom
  .string({ name: 'First Name' })
  .required()
  .max(4, "$value is not a valid input for '$name', max length is 4")
console.log(schema.validate('a12345'))
console.log(schema.validate('b12'))
// if a is not in string then min is 2 and max is 5
