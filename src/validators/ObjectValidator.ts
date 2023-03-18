import { isNil } from "../utils/isNil";
import { BaseValidator, ValidationError } from "./types/types";

export type ObjectShape = {
  [key in string]: BaseValidator;
};
export class ObjectValidator extends BaseValidator<any> {
  private _errors: ValidationError[] = [];
  private _objectShape: ObjectShape;
  private _value: any;
  private _required: boolean = false;

  constructor(shape: ObjectShape) {
    super();
    this._objectShape = shape;
  }

  private isObject(val: any) {
    if (val) {
      if (typeof val !== "object") {
        this._errors.push("Value is not an object");
        throw new Error("Value is not an object");
      }

      if (Array.isArray(val)) {
        this._errors.push("Array is not a valid object");
        throw new Error("Array is not a valid obect");
      }
      return this;
    }
  }

  public required(req?: boolean) {
    this._required = req ?? true;
    return this;
  }

  private validateRequired(value: any) {
    if (this._required) {
      if (isNil(value) || Object.keys(value).length === 0) {
        this._errors.push("Value is required");
        throw new Error("Value is required");
      }
      return true;
    } else {
      return false;
    }
  }

  public validate(value: any) {
    this._value = value;
    this.isObject(value);
    const isRequired = this.validateRequired(value);
    try {
      if (!isNil(value) || isRequired) {
        Object.keys(this._objectShape).forEach((key) => {
          const validator = this._objectShape[key];
          if (validator) {
            const result = validator.validate(value[key]);
            this._value[key] = result;
          }
        });
      }
      return this._value;
    } catch (err) {
      throw err;
    }
  }

  public getErrors(): ValidationError[] {
    return this._errors;
  }
}
