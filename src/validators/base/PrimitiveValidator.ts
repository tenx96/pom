import { generateRandomString } from '../../utils/generateRandomString'
import PomValidationError, {
  type ValidationError
} from '../PomValidationError'
import { BaseValidator, type ValidationFunction } from './BaseValidator'

export type Updaters = { [key in string]: (...args: any) => Updaters }

export abstract class PrimitiveValidator<
  ValidationFns extends string,
  SchemaUpdater = Updaters,
  ValueType = any
> extends BaseValidator<ValueType> {
  protected _validationSchema: {
    [key in ValidationFns]?: ValidationFunction;
  } & { [key in string]?: ValidationFunction } = {}

  protected _dynamicValidationSchema: {
    [key in ValidationFns]?: ValidationFunction;
  } & { [key in string]?: ValidationFunction } = {}

  private readonly _schemaUpdaters: Array<(val: any) => void> = []

  protected _errors: ValidationError[] = []
  protected _value: any
  protected name = ''

  protected abstract _isValidType (): void

  protected _getErrors = () => this._errors

  constructor (options?: { name?: string }) {
    super()
    this.name = options?.name ?? ''
  }

  public when ({
    is,
    then,
    otherwise
  }: {
    is: any | ((val: any) => boolean)
    then: (updater: SchemaUpdater, val: any) => void
    otherwise?: (updater: SchemaUpdater, val: any) => void
  }) {
    this._schemaUpdaters.push((val) => {
      let condition
      if (typeof is === 'function') {
        // if is is a function then call it with the value and use the result as the condition
        condition = is(val)
      } else {
        // if is is not a function then compare the value to is
        condition = val === is
      }
      if (condition) {
        // if condition is true then call then fn
        then(this._schemaUpdater(), val)
      } else {
        // if condition is false then call otherwise fn if it exists
        if (otherwise) otherwise(this._schemaUpdater(), val)
      }
    })
    return this
  }

  abstract _schemaUpdater (): SchemaUpdater

  validate (value: any): ValueType {
    this._errors = []
    this._value = value
    this._isValidType() // default validation
    const dynamicValidationSchema = this._generateDynamicValidationScehma() // calculate dynamic schema generated using 'when'
    const isValid = Object.values({
      ...this._validationSchema,
      ...dynamicValidationSchema // add dynamic schema to the default schema
    }).every((validator) => {
      try {
        if (validator != null) {
          return validator(this._value)
        }
        return false
      } catch (err) {
        if (err instanceof PomValidationError) {
          this._errors.push(err.latestError)
          return false
        } else {
          throw err
        }
      }
    }) // validate the value using the validator
    if (isValid) {
      return this._value
    }
    throw new PomValidationError(this._getErrors())
  }

  // generate dynamic schema based on the when fn
  private readonly _generateDynamicValidationScehma = () => {
    this._dynamicValidationSchema = {}
    this._schemaUpdaters.forEach((updater) => {
      updater(this._value)
    }) // updaters added with when fn
    return this._dynamicValidationSchema
  }

  public custom (fn: ValidationFunction, name?: string): this {
    const fnName = name ?? generateRandomString(24);
    (this._validationSchema as any)[fnName] = fn
    return this
  }

  protected updateDymamicSchema (fnName: ValidationFns, fn: ValidationFunction) {
    (this._dynamicValidationSchema as any)[fnName] = fn
  }

  protected _pushError (args: Omit<ValidationError, 'inputName'>) {
    this._errors.push({ inputName: this.name, ...args })
  }
}
