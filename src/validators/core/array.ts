import { isNil } from '../../utils/isNil'
import { BaseValidator } from '../base/BaseValidator'
import { pom } from '../pom'
import PomValidationError from '../PomValidationError'

export type DynamicEach = (val: any) => BaseValidator
export type DynamicEachStore = DynamicEach[]

export class ArrayValiator extends BaseValidator<any> {
  private readonly _each: BaseValidator
  private _value: any[]
  private _required: boolean = false
  private readonly _dynamicEachStore: DynamicEachStore = []

  constructor (each?: BaseValidator) {
    super()
    this._each = each ?? pom.anything()
    this._value = []
  }

  private isArray (valueToValidate: any[]) {
    if (valueToValidate) {
      // validate only if value is not null or undefined. null case to be handled by required validator
      if (!Array.isArray(valueToValidate)) {
        throw new PomValidationError([
          {
            message: 'Value is not an array',
            fnName: 'isArray',
            value: valueToValidate
          }
        ])
      }
    }
  }

  public required (required?: boolean) {
    this._required = required ?? true
    return this
  }

  private isRequired (val: any) {
    if (this._required) {
      if (isNil(val)) {
        // value is null or undefined
        throw new PomValidationError([
          {
            message: 'Value is required',
            fnName: 'isRequired',
            value: val
          }
        ])
      } else {
        // value is defined, validate if length of array is greater than 0
        if (Array.isArray(val)) {
          // is a valid array, check if length is greater than 0
          if (val.length === 0) {
            throw new PomValidationError([
              {
                message: 'Array must not be empty',
                fnName: 'isRequired',
                value: val
              }
            ])
          }
          // is valid retrn true
          return true
        } else {
          // is not a valid array
          throw new PomValidationError([
            {
              message: 'Invalid argument, expected array',
              fnName: 'isRequired',
              value: val
            }
          ])
        }
      }
    } else {
      return false
    }
  }

  public when ({ is, then, otherwise }: {
    is: any | ((val: any) => boolean)
    then: (val: any) => BaseValidator
    otherwise?: (val: any) => BaseValidator
  }): this {
    // if condition is true then call then call then fn else call otherwise fn
    // both then and otherwise should return an object shape
    // object shape will be used to conditionally update the object shape depending on value
    // store this in dynamic shapes. It holds an array of functions that return an object shape
    this._dynamicEachStore.push((val) => {
      const condition = typeof is === 'function' ? is(val) : val === is
      let shape: BaseValidator
      if (condition) {
        shape = then(val)
      } else {
        shape = otherwise ? otherwise(val) : this._each
      }
      return shape
    })
    return this
  }

  public validate (valueToValidate: any) {
    this._value = valueToValidate
    this.isArray(valueToValidate)
    const isRequired = this.isRequired(valueToValidate)
    let each = this._each
    if (this._dynamicEachStore.length > 0) {
      this._dynamicEachStore.forEach((eachGen) => {
        // only select the last dynamic each definition, if multiple are defined
        each = eachGen(valueToValidate)
      })
    }
    if (isRequired || !isNil(valueToValidate)) {
      if (this._each !== undefined) {
        this._value = this._value.map((item) => each.validate(item))
      }
    }
    return this._value
  }
}
