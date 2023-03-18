import { isNil } from "../utils/isNil";
import { BaseValidator, ValidationError } from "./types/types";

export class ArrayValiator extends BaseValidator<any> {
  private errors: ValidationError[] = [];
  private each?: BaseValidator;
  private value: any[];

  constructor(each?: BaseValidator) {
    super();
    this.each = each ;
    this.value = [];
  }

  private isArray(valueToValidate: any[]) {
    if (!Array.isArray(valueToValidate)) {
      this.errors.push("Value is not an array");
      throw new Error("Value is not an array");
    }
  }

  // public required() {
  //   if(!isNil(this.value) && this.value.length === 0) {
  //     this.errors.push("Value is required");
  //     throw new Error("Value is required");
  //   }
  //   return this;
  // }



  public validate(valueToValidate: any[]) {
    this.value = [];
    this.isArray(valueToValidate);
    try {
      if(this.each !== undefined) {
        valueToValidate.forEach((item) => {
          const result = this.each?.validate(item);
          this.value.push(result);
        });
        return this.value;
      }
    } catch (err) {
      throw err;
    }
  }

  public getErrors(): ValidationError[] {
    return this.errors;
  }
}
