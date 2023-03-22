import pom from '../../validators'
describe('validates custom message on string validations', () => {
  it('should show custom message on required failure', () => {
    const schema = pom.string().required(true, 'name is required')
    expect(() => schema.validate('')).toThrowError('name is required')
  })
  it('should show custom message on required failure and replace $name with name passed to string options and $value with value that was validated', () => {
    const schema = pom.string({ name: 'username' }).required(true, '$value is not a valid input.$name is required')
    expect(() => schema.validate('')).toThrowError(' is not a valid input.username is required')
  })
  it('should show custom message on min failure and replace $name with name passed to string options and $value with value that was validated', () => {
    const schema = pom.string({ name: 'username' }).min(10, 'min length is 10')
    expect(() => schema.validate('123')).toThrowError('min length is 10')
    const schema2 = pom.string({ name: 'username' }).min(10, '$value is not valid. min length is 10 for $name')
    expect(() => schema2.validate('123')).toThrowError('123 is not valid. min length is 10 for username')
  })
  it('should show custom message on min failure and replace $name with name passed to string options and $value with value that was validated', () => {
    const schema = pom.string({ name: 'username' }).max(10, 'max length is 10')
    expect(() => schema.validate('123123123123123123')).toThrowError('max length is 10')
    const schema2 = pom.string({ name: 'username' }).max(10, '$value is not valid. max length is 10 for $name')
    expect(() => schema2.validate('12345678901')).toThrowError('12345678901 is not valid. max length is 10 for username')
  })
  it('checks custom message for regex', () => {
    const schema = pom.string().regex(/^[a-zA-Z0-9]+$/, 'only alphanumeric allowed')
    expect(() => schema.validate('#$@')).toThrowError('only alphanumeric allowed')
  })
  it('checks custom message for regex and replace $name with name passed to string options and $value with value that was validated', () => {
    const schema = pom.string({ name: 'username' }).regex(/^[a-zA-Z0-9]+$/, '$value is not valid. only alphanumeric allowed for $name')
    expect(() => schema.validate('#$@')).toThrowError('#$@ is not valid. only alphanumeric allowed for username')
  })
})
