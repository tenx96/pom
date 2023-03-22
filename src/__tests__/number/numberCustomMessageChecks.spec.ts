import pom from '../../validators'
describe('custom message checks for number validations', () => {
  it('checks custom message for max', () => {
    const schema = pom.number().max(10, 'max value is 10')
    expect(() => schema.validate(11)).toThrowError('max value is 10')
    const schema2 = pom.number({ name: 'rating' }).max(10, '$value is not a valid input for $name')
    expect(() => schema2.validate(11)).toThrowError('11 is not a valid input for rating')
  })
  it('checks custom message for min', () => {
    const schema = pom.number().min(10, 'min value is 10')
    expect(() => schema.validate(9)).toThrowError('min value is 10')
    const schema2 = pom.number({ name: 'rating' }).min(10, '$value is not a valid input for $name')
    expect(() => schema2.validate(9)).toThrowError('9 is not a valid input for rating')
  })
  it('checks custom message for required', () => {
    const schema = pom.number().required(true, 'this field is required')
    expect(() => schema.validate(undefined)).toThrowError('this field is required')
    const schema2 = pom.number({ name: 'rating' }).required(true, '$value is not a valid input for $name')
    expect(() => schema2.validate(undefined)).toThrowError('undefined is not a valid input for rating')
  })
})
