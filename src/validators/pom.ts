import {
  BooleanValidation,
  NumberValidation,
  ObjectValidator,
  StringValidation,
  ArrayValiator,
  ObjectShape,
} from ".";
import { BaseValidator } from "./base/BaseValidator";

export const pom = {
  string: (options?: {name : string}) => new StringValidation(options),
  number: () => new NumberValidation(),
  boolean: () => new BooleanValidation(),
  object: (shape: ObjectShape) => new ObjectValidator(shape),
  array: (each?: BaseValidator) => new ArrayValiator(each),
};
