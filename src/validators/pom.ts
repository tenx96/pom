import {
  BooleanValidation,
  NumberValidation,
  ObjectValidator,
  StringValidation,
  ArrayValiator,
  ObjectShape,
} from ".";
import { BaseValidator } from "./types/types";

export const pom = {
  string: () => new StringValidation(),
  number: () => new NumberValidation(),
  boolean: () => new BooleanValidation(),
  object: (shape: ObjectShape) => new ObjectValidator(shape),
  array: (each: BaseValidator) => new ArrayValiator(each),
};
