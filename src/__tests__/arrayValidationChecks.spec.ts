import pom from '../validators'
describe('numberValidationChecks', () => {
  it('checks if the value is an array', () => {
    const schema = pom.array()
    expect(() => schema.validate({} as any)).toThrowError()
    expect(() => schema.validate([])).not.toThrowError()
  })
  it('checks if the value is an array of numbers', () => {
    const schema = pom.array(pom.number())
    expect(() => schema.validate({} as any)).toThrowError()
    expect(() => schema.validate([])).not.toThrowError()
    expect(schema.validate([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('checks if the value is an array of numbers and converts parsable string to numbers', () => {
    const schema = pom.array(pom.number())
    expect(() => schema.validate({} as any)).toThrowError()
    expect(() => schema.validate([])).not.toThrowError()
    expect(schema.validate([1, 2, '3'])).toEqual([1, 2, 3])
    expect(schema.validate([1, 2, '333'])).toEqual([1, 2, 333])
    expect(() => schema.validate([1, 2, 'aa333aa'])).toThrowError()
  })

  it('checks if the value is an array of string and converts number to strings', () => {
    const schema = pom.array(pom.string())
    expect(schema.validate([1, 2, '3'])).toEqual(['1', '2', '3'])
  })

  it('checks length of each item in array to have min length 5', () => {
    const schema = pom.array(pom.string().min(5))
    expect(() => schema.validate([1, 2, '3'])).toThrowError()
    expect(schema.validate(['abcdef'])).toEqual(['abcdef'])
  })

  it('checks value of each item(number) in array have min and max value 5 and 10 resp', () => {
    const schema = pom.array(pom.number().min(5).max(10))
    expect(() => schema.validate([1, 2, '3'])).toThrowError()
    expect(() => schema.validate([1, 2, 11])).toThrowError()
    expect(() => schema.validate([1, 2, '15'])).toThrowError()
    expect(schema.validate([6, 7])).toEqual([6, 7])
    expect(schema.validate(['6', '9'])).toEqual([6, 9])
  })

  it('if required nullables should throw', () => {
    const schema = pom.array().required()
    expect(() => schema.validate({} as any)).toThrowError()
    expect(() => schema.validate([])).toThrowError()
    expect(schema.validate([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('if required is NOT specified nullables should NOT throw', () => {
    const schema = pom.array()
    expect(() => schema.validate(null)).not.toThrowError()
    expect(() => schema.validate(undefined)).not.toThrowError()
    expect(() => schema.validate([])).not.toThrowError()
    expect(schema.validate([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('conditional array validation check : if length of array is greater than 2 then min value of each item should be 5 else 2', () => {
    const array = pom.array(pom.number().min(2)).when({
      is: (value: any) => value.length > 3,
      then: () => pom.array(pom.number().min(5))
    })

    expect(() => array.validate([1, 2, 3])).toThrowError() // 1 will fail as len is less than 3 and min is 2
    expect(() => array.validate([4, 5, 6, 7, 8])).toThrowError() // 4 will fail as len is greater than 3 and min is 5
    expect(array.validate([5, 6, 7])).toEqual([5, 6, 7]) // then case
    expect(array.validate([2, 3])).toEqual([2, 3]) // default case
  })
})
