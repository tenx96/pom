import { isNil } from "../utils/isNil";
import PomValidationError, { ValidationError } from "./PomValidationError";
import { BaseValidator } from "./base/BaseValidator";

export type ObjectShape = {
  [key in string]: BaseValidator;
};
export class ObjectValidator extends BaseValidator<any> {
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
        throw new PomValidationError([
          {
            message: "Value is not an object",
            fnName: "isObject",
            value: val,
          },
        ]);
      }

      if (Array.isArray(val)) {
        throw new PomValidationError([
          {
            message: "value is not a valid object",
            fnName: "isObject",
            value: val,
          },
        ]);
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
      if (isNil(value)) {
        throw new PomValidationError([
          {
            message: "Value is required",
            fnName: "validateRequired",
            value: value,
          },
        ]);
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
}
