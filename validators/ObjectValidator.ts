import { BaseValidator, ValidationError } from "./types/types";

export type ObjectShape = {
  [key in string]: BaseValidator;
};
export class ObjectValidator extends BaseValidator<any> {
  private errors: ValidationError[] = [];
  private objectShape: ObjectShape;
  private value: any;

  constructor(shape: ObjectShape) {
    super();
    this.objectShape = shape;
  }

  public validate(value: any) {
    this.value = value;
    try {
      Object.keys(value).forEach((key) => {
        const validator = this.objectShape[key];
        if (validator) {
          const result = validator.validate(value[key]);
          this.value[key] = result;
        }
      });

      return this.value;
    } catch (err) {
      throw err
    }
  }

  public getErrors(): ValidationError[] {
    return this.errors;
  }
}
