import pom from '../validators'
describe('numberValidationChecks', () => {
  it('checks if the value is an array', () => {
    const schema = pom.object({
      name: pom.string()
    }).when({
      is: (val: any) => val.name.length > 5,
      then (val) {
        return pom.object({
          name: pom.string().email()
        })
      }
    })
    expect(() => schema.validate({ name: 'madasdasd' })).toThrowError() // as greater than 5 it should be an email
    expect(schema.validate({ name: 'sample@email.com' })).toEqual({ name: 'sample@email.com' }) // as greater than 5 it should be an email
    expect(schema.validate({ name: '123' })).toEqual({ name: '123' }) // as les than 5 it should be any string
  })
})
