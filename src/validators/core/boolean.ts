import * as boolUtils from '../../utils/bool.utils'
import { castToBoolean } from '../../utils/castTo.util'
import { handleValidationError } from '../../utils/handleValidationError'
import { PrimitiveValidator } from '../base/PrimitiveValidator'
import PomValidationError from '../PomValidationError'

export type BooleanValidationFns = 'isTrue' | 'isFalse' | 'required'

export interface BooleanSchemaUpdater {
  isTrue: (customMessage?: string) => BooleanSchemaUpdater
  isFalse: (customMessage?: string) => BooleanSchemaUpdater
  required: (
    required?: boolean,
    customMessage?: string
  ) => BooleanSchemaUpdater
}

export class BooleanValidation extends PrimitiveValidator<
BooleanValidationFns,
any,
boolean
> {
  /** this is a private method as we dont need to expose it. The intention is to have this check enabled as the first check of this class so we insert this rule at the beginning of the schema */
  _schemaUpdater (): BooleanSchemaUpdater {
    return {
      isTrue: (customMessage?: string) => {
        this._dynamicValidationSchema.isTrue = (value) =>
          handleValidationError(boolUtils.isTrue(value), customMessage)
        return this._schemaUpdater()
      },
      isFalse: (customMessage?: string) => {
        this._dynamicValidationSchema.isFalse = (value) =>
          handleValidationError(boolUtils.isFalse(value), customMessage)
        return this._schemaUpdater()
      },
      required: (required?: boolean, customMessage?: string) => {
        this._dynamicValidationSchema.required = (value) =>
          handleValidationError(
            boolUtils.required(value, required),
            customMessage
          )
        return this._schemaUpdater()
      }
    }
  }

  _isValidType (): this {
    const input = this._value
    try {
      const inputDraft = castToBoolean(input)
      this._value = inputDraft
    } catch (err: any) {
      throw new PomValidationError({
        message: err.message || 'Value is not a boolean',
        fnName: '_isValidType',
        value: input
      })
    }
    return this
  }

  public isTrue (customMessage?: string): this {
    this._validationSchema.isTrue = (value) =>
      handleValidationError(boolUtils.isTrue(value), customMessage)
    return this
  }

  public isFalse (customMessage?: string): this {
    this._validationSchema.isFalse = (value) =>
      handleValidationError(boolUtils.isFalse(value), customMessage)
    return this
  }

  public required (required?: boolean, customMessage?: string): this {
    this._validationSchema.required = (value) =>
      handleValidationError(boolUtils.required(value, required), customMessage)
    return this
  }
}
