import { isNil } from "../utils/isNil";
import PomValidationError, { ValidationError } from "./PomValidationError";
import { BaseValidator } from "./base/BaseValidator";

export class ArrayValiator extends BaseValidator<any> {
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
        throw new PomValidationError([
          {
            message: "Value is not an array",
            fnName: "isArray",
            value: valueToValidate,
          },
        ]);
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
        throw new PomValidationError([
          {
            message: "Value is required",
            fnName: "isRequired",
            value: val,
          },
        ]);
      } else {
        // value is defined, validate if length of array is greater than 0
        if (Array.isArray(val)) {
          // is a valid array, check if length is greater than 0
          if (val.length === 0) {
            throw new PomValidationError([
              {
                message: "Array must not be empty",
                fnName: "isRequired",
                value: val,
              },
            ]);
          }
          // is valid retrn true
          return true;
        } else {
          // is not a valid array
          throw new PomValidationError([
            {
              message: "Invalid argument, expected array",
              fnName: "isRequired",
              value: val,
            },
          ]);
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
}
