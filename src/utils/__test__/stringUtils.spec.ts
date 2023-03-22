import * as stringUtils from '../stringUtils'

describe('stringUtils', () => {
  it('validates a email, returns an error message when error and void when true', () => {
    expect(stringUtils.email('invalid@text..com')).toBe('input must be a valid email')
    expect(stringUtils.email('user@email.com')).toBeUndefined()
    expect(stringUtils.email('you@@email.com')).toBe('input must be a valid email')
  })
  it('validates a required, returns an error message when error and void when true', () => {
    expect(stringUtils.required('')).toBe('input is required')
    expect(stringUtils.required('test')).toBeUndefined()
  })
  it('validates a min, returns an error message when error and void when true', () => {
    expect(stringUtils.min(2, 'a')).toBe(
      'input must have at least 2 characters'
    )
    expect(stringUtils.min(2, 'ab')).toBeUndefined()
  })
  it('validates a max, returns an error message when error and void when true', () => {
    expect(stringUtils.max(2, 'abc')).toBe(
      'input must have maximum 2 characters'
    )
    expect(stringUtils.max(2, 'ab')).toBeUndefined()
  })
  it('validates a regex, returns an error message when error and void when true', () => {
    expect(stringUtils.regex(/^[a-z]+$/, 'abc')).toBeUndefined()
    expect(stringUtils.regex(/^[a-z]+$/, 'abc1')).toBe(
      'input must match the regex ^[a-z]+$'
    )
  })
})
