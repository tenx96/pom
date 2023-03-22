import * as castUtils from '../castTo.util'

describe('castUtils', () => {
  it('casts a string to a number, returns an error message when error and the value itself when successfully changed to required type', () => {
    expect(() => castUtils.castToNumber('')).toThrowError(
      'Cannot convert value to number'
    )
    expect(castUtils.castToNumber(true)).toBe(1)
    expect(castUtils.castToNumber(false)).toBe(0)
    expect(() => castUtils.castToNumber('333aa')).toThrowError()
    expect(() => castUtils.castToNumber(undefined)).not.toThrowError(
      'Cannot convert value to number'
    )
    expect(() => castUtils.castToNumber(NaN)).not.toThrowError(
      'Cannot convert value to number'
    )
    expect(() => castUtils.castToNumber(null)).not.toThrowError(
      'Cannot convert value to number'
    )
    expect(() => castUtils.castToNumber({})).toThrowError(
      'Cannot convert value to number'
    )
    expect(() => castUtils.castToNumber([])).toThrowError(
      'Cannot convert value to number'
    )
    expect(castUtils.castToNumber('1')).toBe(1)
  })
  it('casts a number or boolean to a string, returns an error message when error and the value itself when successfully changed to required type', () => {
    expect(castUtils.castToString('')).toBe('')
    expect(castUtils.castToString(true)).toBe('true')
    expect(castUtils.castToString(false)).toBe('false')
    expect(() => castUtils.castToString(undefined)).not.toThrowError()
    expect(() => castUtils.castToString(NaN)).not.toThrowError()
    expect(() => castUtils.castToString(null)).not.toThrowError()
    expect(() => castUtils.castToString({})).toThrowError(
      'Cannot convert value to string'
    )
    expect(() => castUtils.castToString([])).toThrowError(
      'Cannot convert value to string'
    )
    expect(castUtils.castToString(1)).toBe('1')
  })

  it('casts a string to a boolean, returns an error message when error and the value itself when successfully changed to required type', () => {
    expect(() => castUtils.castToBoolean('')).toThrowError(
      'Cannot convert value to boolean'
    )
    expect(() => castUtils.castToBoolean({})).toThrowError(
      'Cannot convert value to boolean'
    )
    expect(() => castUtils.castToBoolean([])).toThrowError(
      'Cannot convert value to boolean'
    )
    expect(castUtils.castToBoolean(true)).toBe(true)
    expect(castUtils.castToBoolean(false)).toBe(false)
    expect(castUtils.castToBoolean(undefined)).toBe(undefined)
    expect(castUtils.castToBoolean(NaN)).toBe(NaN)
    expect(castUtils.castToBoolean(null)).toBe(null)
    expect(castUtils.castToBoolean('true')).toBe(true)
    expect(castUtils.castToBoolean('false')).toBe(false)
    expect(castUtils.castToBoolean('True')).toBe(true)
    expect(castUtils.castToBoolean('False')).toBe(false)
  })
})
