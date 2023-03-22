import { isNil } from '../../utils/isNil'
import { BaseValidator } from '.././base/BaseValidator'
import PomValidationError from '../PomValidationError'

export type ObjectShape = {
  [key in string]: BaseValidator;
}

export type DynamicShape = (val: any) => ObjectValidator
export type DynamicShapeStore = DynamicShape[]

export class ObjectValidator extends BaseValidator<any> {
  private readonly _objectShape: ObjectShape
  private readonly _dynamicShapes: DynamicShapeStore
  private _value: any
  private _required: boolean = false

  constructor (shape: ObjectShape) {
    super()
    this._objectShape = shape
    this._dynamicShapes = []
  }

  private isObject (val: any) {
    if (val) {
      if (typeof val !== 'object') {
        // throw an error if value is not an object
        throw new PomValidationError([
          {
            message: 'Value is not an object',
            fnName: 'isObject',
            value: val
          }
        ])
      }

      if (Array.isArray(val)) {
        // array is not an object
        throw new PomValidationError([
          {
            message: 'value is not a valid object',
            fnName: 'isObject',
            value: val
          }
        ])
      }
      return this
    }
  }

  public required (req?: boolean) {
    this._required = req ?? true
    return this
  }

  public when ({ is, then, otherwise }: {
    is: any | ((val: any) => boolean)
    then: (val: any) => ObjectValidator
    otherwise?: (val: any) => ObjectValidator
  }): this {
    // if condition is true then call then call then fn else call otherwise fn
    // both then and otherwise should return an object shape
    // object shape will be used to conditionally update the object shape depending on value
    // store this in dynamic shapes. It holds an array of functions that return an object shape
    this._dynamicShapes.push((val) => {
      const condition = typeof is === 'function' ? is(val) : val === is
      let shape: ObjectValidator
      if (condition) {
        shape = then(val)
      } else {
        shape = otherwise ? otherwise(val) : this
      }
      return shape
    })
    return this
  }

  private validateRequired (value: any) {
    if (this._required) {
      if (isNil(value)) {
        throw new PomValidationError([
          {
            message: 'Value is required',
            fnName: 'validateRequired',
            value
          }
        ])
      }
      return true
    } else {
      return false
    }
  }

  get shape () {
    return this._objectShape
  }

  public validate (value: any) {
    this._value = value
    this.isObject(value)
    const isRequired = this.validateRequired(value)
    let objectShape = this.shape
    if (this._dynamicShapes.length > 0) {
      this._dynamicShapes.forEach(fn => {
        objectShape = fn(value).shape // get the final shape from the dynamic shapes if available
      })
    }
    // validate the value against the shape
    if (!isNil(value) || isRequired) {
      Object.keys(objectShape).forEach((key) => {
        const validator = objectShape[key]
        if (validator) {
          const result = validator.validate(value[key])
          this._value[key] = result
        }
      })
    }
    return this._value
  }
}
