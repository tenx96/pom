import { BaseValidator, ValidationError } from "./types/types";

export class ArrayValiator extends BaseValidator<any> {
  private errors: ValidationError[] = [];
  private each: BaseValidator;
  private value: any[];

  constructor(each: BaseValidator) {
    super();
    this.each = each;
    this.value = [];
  }

  public validate(valueToValidate: any[]) {
    this.value = [];
    try {
      valueToValidate.forEach((item) => {
        const result = this.each.validate(item);
        this.value.push(result);
      });
      return this.value;
    } catch (err) {
      throw err;
    }
  }

  public getErrors(): ValidationError[] {
    return this.errors;
  }
}
