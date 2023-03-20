// validates number util functions
import * as numberUtils from '../numberUtils'
describe('numberUtils', () => {
  it('validates a max, returns an error message when error and void when true', () => {
    expect(numberUtils.max(2, 3)).toBe('input must have maximum 2 characters')
    expect(numberUtils.max(2, 1)).toBeUndefined()
  })

  it('validates a min, returns an error message when error and void when true', () => {
    expect(numberUtils.min(2, 1)).toBe('input must have at least 2 characters')
    expect(numberUtils.min(2, 3)).toBeUndefined()
  })

  it('validates a equal, returns an error message when error and void when true', () => {
    expect(numberUtils.equal(2, 1)).toBe('input must be equal 2')
    expect(numberUtils.equal(2, 2)).toBeUndefined()
  })
  it('validates a positive, returns an error message when error and void when true', () => {
    expect(numberUtils.positive(-1)).toBe('input must be positive')
    expect(numberUtils.positive(1)).toBeUndefined()
  })
  it('validates a negative, returns an error message when error and void when true', () => {
    expect(numberUtils.negative(1)).toBe('input must be negative')
    expect(numberUtils.negative(-1)).toBeUndefined()
  })

  it('validates a required, returns an error message when error and void when true', () => {
    expect(numberUtils.required('')).toBe('input is not a number')
    expect(numberUtils.required(123)).toBeUndefined()
  })
})
