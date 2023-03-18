import { isNil } from "../utils/isNil";
import { BaseValidator, ValidationError } from "./types/types";

export class ArrayValiator extends BaseValidator<any> {
  private _errors: ValidationError[] = [];
  private _each?: BaseValidator;
  private _value: any[];
  private _required: boolean = false;

  constructor(each?: BaseValidator) {
    super();
    this._each = each;
    this._value = [];
  }

  private isArray(valueToValidate: any[]) {
    if (valueToValidate) {
      // validate only if value is not null or undefined. null case to be handled by required validator
      if (!Array.isArray(valueToValidate)) {
        this._errors.push("Value is not an array");
        throw new Error("Value is not an array");
      }
    }
  }

  public required(required?: boolean) {
    this._required = required ?? true;
    return this;
  }

  private isRequired(val: any) {
    if (this._required) {
      if (isNil(val)) {
        // value is null or undefined
        this._errors.push("Value is required");
        throw new Error("Value is required");
      } else {
        // value is defined, validate if length of array is greater than 0
        if (Array.isArray(val)) {
          // is a valid array, check if length is greater than 0
          if (val.length === 0) {
            this._errors.push("Array must not be empty");
            throw new Error("Array must not be empty");
          }
          // is valid retrn true
          return true;
        } else {
          // is not a valid array
          throw new Error("Invalid argument, expected array");
        }
      }
    } else {
      return false;
    }
  }

  public validate(valueToValidate: any) {
    this._value = valueToValidate;
    this.isArray(valueToValidate);
    const isRequired = this.isRequired(valueToValidate);
    if (isRequired || !isNil(valueToValidate)) {
      try {
        if (this._each !== undefined) {
          this._value = this._value.map((item) => this._each?.validate(item));
        }
      } catch (err) {
        throw err;
      }
    }
    return this._value;
  }

  public getErrors(): ValidationError[] {
    return this._errors;
  }
}
