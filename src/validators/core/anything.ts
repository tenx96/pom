import { BaseValidator } from '../base/BaseValidator'

// this is a validator that does nothing. It is used to validate any value
export class AnythingValidator extends BaseValidator {
  validate (value: any) {
    return value
  }
}
