import {
  BooleanValidation,
  NumberValidation,
  ObjectValidator,
  StringValidation,
  ArrayValiator,
  type ObjectShape
} from '.'
import { type BaseValidator } from './base/BaseValidator'
import { AnythingValidator } from './core/anything'
export interface PomOptions {
  name?: string
}

export const pom = {
  string: (options?: PomOptions) => new StringValidation(options),
  number: (options?: PomOptions) => new NumberValidation(options),
  bool: (options?: PomOptions) => new BooleanValidation(options),
  object: (shape: ObjectShape) => new ObjectValidator(shape),
  array: (each?: BaseValidator) => new ArrayValiator(each),
  anything: () => new AnythingValidator()
}
