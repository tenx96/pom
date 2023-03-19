import { isNil } from "../utils/isNil";
import PomValidationError, { ValidationError } from "./PomValidationError";
import { BaseValidator, ValidationFunction } from "./base/BaseValidator";
import { PrimitiveValidator, Updaters } from "./base/PrimitiveValidator";

export type NumberValidationFn =
  | "min"
  | "max"
  | "equal"
  | "required"
  | "positive"
  | "negative";

export class NumberValidation extends PrimitiveValidator<NumberValidationFn> {
  constructor(options?: { name?: string }) {
    super(options);
  }

  /** this is a private method as we dont need to expose it. The intention is to have this check enabled as the first check of this class so we insert this rule at the beginning of the schema */
  _isValidType() {
    const input = this._value;
    if (!isNil(input)) {
      if (typeof input === "number" && !isNaN(input)) {
        if (!Number.isFinite(input)) {
          throw new PomValidationError({
            message: "Infinity cannot be validated",
            fnName: "isNumber",
            value: input,
            inputName: this.name,
          });
        }
      } else if (typeof input === "string") {
        const parsed = parseInt(input);
        if (!isNaN(parsed)) {
          this._value = parsed;
        } else {
          throw new PomValidationError({
            fnName: "isNumber",
            message: "Unable to cast string to number",
            value: input,
            inputName: this.name,
          });
        }
      } else {
        throw new PomValidationError({
          fnName: "isNumber",
          message: "Input must be a valid number",
          value: input,
          inputName: this.name,
        });
      }

      return true;
    }
  }

  private _required =
    (required?: boolean, message?: string): ValidationFunction =>
    (value) => {
      const isRequired = required ?? true;
      if (isRequired) {
        if (isNil(value)) {
          this._errors.push({
            message: message || "Field is required",
            fnName: "required",
            value: value,
          });
          return false;
        }
      }
      return true;
    };

  public required(required?: boolean, message?: string): this {
    this._validationSchema.required = this._required(required, message);
    return this;
  }

  private _min =
    (minValue: number, message?: string): ValidationFunction =>
    (value) => {
      if (!isNil(value) && value < minValue) {
        this._pushError({
          message:
            message ||
            `Number must be greater than or equal to ${minValue}, got ${value}`,
          fnName: "min",
          value: value,
        });
        return false;
      }
      return true;
    };
  public min(minValue: number, message?: string): this {
    this._validationSchema.min = this._min(minValue, message);
    return this;
  }

  private _max =
    (maxValue: number, message?: string): ValidationFunction =>
    () => {
      const input = this._value;
      if (!isNil(input) && input > maxValue) {
        this._pushError({
          message:
            message ||
            `Number must be less than or equal to ${maxValue}, got ${input}`,
          fnName: "max",
          value: input,
        });
        return false;
      }
      return true;
    };
  public max(maxValue: number, message?: string): this {
    this._validationSchema.max = this._max(maxValue, message);
    return this;
  }

  private _equal =
    (equalValue: number, message?: string): ValidationFunction =>
    () => {
      const input = this._value;
      if (!isNil(input) && input !== equalValue) {
        this._pushError({
          message:
            message || `Number must be equal to ${equalValue} , got ${input}`,
          fnName: "equal",
          value: input,
        });
        return false;
      }
      return true;
    };
  public equal(equalValue: number, message?: string): this {
    this._validationSchema.equal = this._equal(equalValue, message);
    return this;
  }

  _schemaUpdater(): Updaters {
    return {};
  }
}
