import { castToNumber } from '../utils/castTo.util'
import { handleValidationError } from '../utils/handleValidationError'
import * as numberUtils from '../utils/number.util'
import { type ValidationFunction } from './base/BaseValidator'
import { PrimitiveValidator, type Updaters } from './base/PrimitiveValidator'
import PomValidationError from './PomValidationError'
export type NumberValidationFn =
  | 'min'
  | 'max'
  | 'equal'
  | 'required'
  | 'positive'
  | 'negative'

export class NumberValidation extends PrimitiveValidator<NumberValidationFn> {
  /** this is a private method as we dont need to expose it. The intention is to have this check enabled as the first check of this class so we insert this rule at the beginning of the schema */
  _isValidType () {
    const input = this._value
    try {
      const maybeUpdatedInput = castToNumber(input)
      this._value = maybeUpdatedInput
    } catch (err: any) {
      throw new PomValidationError({
        fnName: 'isNumber',
        message: err.message || 'Input must be a valid number',
        value: input
      })
    }
  }

  private readonly _required =
    (required?: boolean, message?: string): ValidationFunction =>
      (value) =>
        handleValidationError(
          numberUtils.required(value, required),
          message
        )

  private readonly _min =
    (minValue: number, message?: string): ValidationFunction =>
      (value: number) =>
        handleValidationError(numberUtils.min(minValue, value), message)

  private readonly _max =
    (maxValue: number, message?: string): ValidationFunction =>
      (value) =>
        handleValidationError(numberUtils.max(maxValue, value), message)

  public required (required?: boolean, message?: string): this {
    this._validationSchema.required = this._required(required, message)
    return this
  }

  public min (minValue: number, message?: string): this {
    this._validationSchema.min = this._min(minValue, message)
    return this
  }

  public max (maxValue: number, message?: string): this {
    this._validationSchema.max = this._max(maxValue, message)
    return this
  }

  private readonly _equal =
    (equalValue: number, message?: string): ValidationFunction =>
      (value) =>
        handleValidationError(
          numberUtils.equal(equalValue, value),
          message
        )

  public equal (equalValue: number, message?: string): this {
    this._validationSchema.equal = this._equal(equalValue, message)
    return this
  }

  _schemaUpdater (): Updaters {
    return {}
  }
}
