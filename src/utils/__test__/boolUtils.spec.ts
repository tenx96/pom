import * as boolUtils from '../bool.utils'

describe('boolUtils', () => {
  it('validates a required, returns an error message when error and void when true', () => {
    expect(boolUtils.required(undefined)).toBe('input is required')
    expect(boolUtils.required(false)).toBeUndefined()
  })
  it('validates a isTrue, returns an error message when error and void when true', () => {
    expect(boolUtils.isTrue(false)).toBe('input is not true')
  })
  it('validates a isFalse, returns an error message when error and void when true', () => {
    expect(boolUtils.isFalse(true)).toBe('input is not false')
  })
  it('validates a isBoolean, returns an error message when error and void when true', () => {
    expect(boolUtils.isBoolean('')).toBe('input is not a boolean')
    expect(boolUtils.isBoolean(true)).toBeUndefined()
  })
})
