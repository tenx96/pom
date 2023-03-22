import pom from '../validators'
describe('stringValidationChecks', () => {
  it('should throw when null or undefined in case REQUIRED string', () => {
    const schema = pom.anything()
    expect(schema.validate(undefined)).toBe(undefined)
    expect(schema.validate(null)).toBe(null)
    expect(schema.validate(NaN)).toBe(NaN)
    expect(schema.validate('')).toBe('')
    expect(schema.validate(1)).toBe(1)
  })
})
