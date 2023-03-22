import { castToString } from '../utils/castUtils'
import { handleValidationError } from '../utils/handleValidationError'
import * as stringUtils from '../utils/stringUtils'
import { type ValidationFunction } from './base/BaseValidator'
import { PrimitiveValidator } from './base/PrimitiveValidator'
import PomValidationError from './PomValidationError'
// string validation fn names
export type StringValidationFn = 'max' | 'min' | 'required' | 'email' | 'regex'

// string validation schema updater, this is used to update the validation schema dynamically using when
export interface StringSchemaUpdater {
  max: (max: number) => StringSchemaUpdater
  min: (min: number) => StringSchemaUpdater
  required: (required?: boolean, message?: string) => StringSchemaUpdater
  email: () => StringSchemaUpdater
  regex: (pattern: RegExp, message?: string) => StringSchemaUpdater
}

export class StringValidation extends PrimitiveValidator<
StringValidationFn,
StringSchemaUpdater,
string
> {
  // casts a number to string and check for a valid string, thows an error if the input is not a valid string
  _isValidType (): this {
    const input = this._value
    try {
      const validInput = castToString(input)
      this._value = validInput
      return this
    } catch (err) {
      throw new PomValidationError([
        {
          message: 'Input must be a valid string',
          fnName: 'isString',
          value: input
        }
      ])
    }
  }

  private readonly _email =
    (message?: string): ValidationFunction =>
      (value) => handleValidationError(stringUtils.email(value), message)

  private readonly _required =
    (required?: boolean, message?: string): ValidationFunction =>
      (value) => handleValidationError(stringUtils.required(value, required), message)

  private readonly _min =
    (min: number, message?: string): ValidationFunction =>
      (value) => handleValidationError(stringUtils.min(min, value), message)

  private readonly _max =
    (max: number, message?: string): ValidationFunction =>
      (value) => handleValidationError(stringUtils.max(max, value), message)

  private readonly _regex =
    (pattern: RegExp, message?: string): ValidationFunction =>
      (value) => handleValidationError(stringUtils.regex(pattern, value), message)

  public email (message?: string): this {
    this._validationSchema.email = this._email(message)
    return this
  }

  public required (req?: boolean, message?: string): this {
    this._validationSchema.required = this._required(req, message)
    return this
  }

  public min (length: number, message?: string): this {
    this._validationSchema.min = this._min(length, message)
    return this
  }

  public max (max: number, message?: string): this {
    this._validationSchema.max = this._max(max, message)
    return this
  }

  public regex (pattern: RegExp, message?: string): this {
    this._validationSchema.regex = this._regex(pattern, message)
    return this
  }

  public getValidators () {
    return {
      email: this._email,
      required: this._required,
      min: this._min,
      max: this._max,
      regex: this._regex
    }
  }

  // schema updater is a function that returns a function that returns a schema updater
  _schemaUpdater = (): StringSchemaUpdater => {
    return {
      max: (max: number, message?: string) => {
        this.updateDymamicSchema('max', this._max(max, message))
        return this._schemaUpdater()
      },
      min: (min: number, message?: string) => {
        this._dynamicValidationSchema.min = this._min(min, message)
        return this._schemaUpdater()
      },
      required: (bool?: boolean, message?: string) => {
        this._dynamicValidationSchema.required = this._required(bool, message)
        return this._schemaUpdater()
      },
      email: (message?: string) => {
        this._dynamicValidationSchema.email = this._email(message)
        return this._schemaUpdater()
      },
      regex: (pattern: RegExp, message?: string) => {
        this._dynamicValidationSchema.regex = this._regex(pattern, message)
        return this._schemaUpdater()
      }
    }
  }
}
