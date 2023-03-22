import pom from '../validators'

describe('Checks bool validation', () => {
  it('isTrue should pass for true', () => {
    const scema = pom.bool().isTrue()
    expect(scema.validate(true)).toBe(true)
    expect(() => expect(scema.validate(false))).toThrowError()
    // if required is not specified it should pass for nullables
    expect(scema.validate(undefined)).toBe(undefined)
    expect(scema.validate(null)).toBe(null)
    expect(scema.validate(NaN)).toBe(NaN)
  })

  it('isTrue with required should pass for true and fail for nullish values ', () => {
    const scema = pom.bool().isTrue().required()
    expect(scema.validate(true)).toBe(true)
    expect(() => expect(scema.validate(false))).toThrowError()
    expect(() => expect(scema.validate(undefined))).toThrowError()
    expect(() => expect(scema.validate(null))).toThrowError()
    expect(() => expect(scema.validate(NaN))).toThrowError()
  })

  it('isFalse should pass for false and ignore nullish values', () => {
    const scema = pom.bool().isFalse()
    expect(scema.validate(false)).toBe(false)
    expect(() => expect(scema.validate(true))).toThrowError()
    // if required is not specified it should pass for nullables
    expect(scema.validate(undefined)).toBe(undefined)
    expect(scema.validate(null)).toBe(null)
    expect(scema.validate(NaN)).toBe(NaN)
  })
  it('isFalse with required should pass for false and fail for nullish values ', () => {
    const scema = pom.bool().isFalse().required()
    expect(scema.validate(false)).toBe(false)
    expect(() => expect(scema.validate(true))).toThrowError()
    expect(() => expect(scema.validate(undefined))).toThrowError()
    expect(() => expect(scema.validate(null))).toThrowError()
    expect(() => expect(scema.validate(NaN))).toThrowError()
  })
})
