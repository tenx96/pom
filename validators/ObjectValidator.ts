import { isNil } from "../utils/isNil";
import { BaseValidator, ValidationError } from "./types/types";

export type ObjectShape = {
  [key in string]: BaseValidator;
};
export class ObjectValidator extends BaseValidator<any> {
  private errors: ValidationError[] = [];
  private objectShape: ObjectShape;
  private value: any;

  shape(shape: ObjectShape) {
    this.objectShape = shape;
  }

  public validate(value: any) {}

  public getErrors(): ValidationError[] {
    return this.errors;
  }
}
