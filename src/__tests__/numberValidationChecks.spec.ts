import pom from '../validators'
describe('numberValidationChecks', () => {
  it('should throw when null or undefined in case REQUIRED number', () => {
    const schema = pom.number().required()
    expect(() => schema.validate(undefined)).toThrowError()
    expect(() => schema.validate(null)).toThrowError()
    expect(() => schema.validate(NaN)).toThrowError()
  })
  it('should throw error if an object or array is passed', () => {
    const schema = pom.number()
    expect(() => schema.validate({})).toThrowError()
    expect(() => schema.validate([])).toThrowError()
  })
  it('should return the number value if a valid number is passed', () => {
    const schema = pom.number().required()
    const result = schema.validate(123)
    expect(result).toBe(123)
    expect(typeof result).toBe('number')
  })
  it('should convert a string to number a valid number string is passed', () => {
    const schema = pom.number()
    expect(schema.validate('123')).toBe(123)
  })
  it('should throw if an invalid number string is passed', () => {
    const schema = pom.number()
    expect(() => schema.validate('abc123')).toThrowError()
  })
  it('should throw error if a boolean is passed', () => {
    const schema = pom.number()
    expect(() => schema.validate(true)).toThrowError()
  })
  it('should throw error if a function is passed', () => {
    const schema = pom.number()
    expect(() => schema.validate(() => {})).toThrowError()
  })
  it('should throw error if a symbol is passed', () => {
    const schema = pom.number()
    expect(() => schema.validate(Symbol('123'))).toThrowError()
  })
  it('should throw error if an object is passed', () => {
    const schema = pom.number()
    expect(() => schema.validate({})).toThrowError()
  })

  it('should throw error if a Infinity is passed', () => {
    const schema = pom.number()
    expect(() => schema.validate(Infinity)).toThrowError()
  })
  it('should throw error if a -Infinity is passed', () => {
    const schema = pom.number()
    expect(() => schema.validate(-Infinity)).toThrowError()
  })

  it('unless required , shoud NOT throw for nullables', () => {
    const schema = pom.number().min(10)
    expect(() => schema.validate(null)).not.toThrowError()
    expect(() => schema.validate(undefined)).not.toThrowError()
    expect(() => schema.validate(NaN)).not.toThrowError()
    expect(schema.validate(10)).toBe(10)
  })
  it('if required , shoud throw for nullables', () => {
    const schema = pom.number().required()
    expect(() => schema.validate(null)).toThrowError()
    expect(() => schema.validate(undefined)).toThrowError()
    expect(() => schema.validate(NaN)).toThrowError()
  })
})
