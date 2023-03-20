import { isNil } from '../utils/isNil'
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
    if (!isNil(input)) {
      if (typeof input === 'string') {
        // if input is a string then we can safely continue
        return this
      } else if (typeof input === 'number') {
        // try to cast a number to string first
        this._value = input.toString()
        return this
      } else {
        throw new PomValidationError([
          {
            message: 'Input must be a valid string',
            fnName: 'isString',
            value: input
          }
        ])
      }
    }
    // if value is nullable ignore check , this should be handled by required fn
    return this
  }

  private readonly _email =
    (message?: string): ValidationFunction =>
      (value) => {
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          this._errors.push({
            fnName: 'email',
            message: message ?? 'Input must be a valid email',
            value,
            inputName: this.name
          })
          return false
        }
        return true
      }

  private readonly _required =
    (required?: boolean, message?: string): ValidationFunction =>
      (value) => {
        const isRequired = required ?? true
        if (!isRequired) {
        // not required so return true
          return true
        } else {
          if (isNil(value) || value === '') {
            this._errors.push({
              fnName: 'required',
              message: message ?? 'string is required',
              value,
              inputName: this.name
            })
            return false
          }
          return true
        }
      }

  private readonly _min =
    (min: number, message?: string): ValidationFunction =>
      (value) => {
        if (value && value.length < min) {
          this._errors.push({
            message: message ?? `string must have at least ${min} characters`,
            fnName: 'min',
            value,
            inputName: this.name
          })
          return false
        }
        return true
      }

  private readonly _max =
    (max: number, message?: string): ValidationFunction =>
      (value) => {
        if (value && value.length > max) {
          this._errors.push({
            message: message ?? `string must have at most ${max} characters`,
            fnName: 'max',
            value,
            inputName: this.name
          })
          return false
        }
        return true
      }

  private readonly _regex =
    (pattern: RegExp, message?: string): ValidationFunction =>
      (value) => {
        if (!pattern.test(value)) {
          this._errors.push({
            message: message ?? `string must match the regex ${pattern.source}`,
            fnName: 'regex',
            value,
            inputName: this.name
          })
          return false
        }
        return true
      }

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
