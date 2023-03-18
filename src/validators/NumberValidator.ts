import { isNil } from "../utils/isNil";
import { ValidationError } from "./PomValidationError";
import { BaseValidator, ValidationFunction } from "./types/types";

export class NumberValidation extends BaseValidator<number> {
  private schema: ValidationFunction[] = [];
  private errors: ValidationError[] = [];
  private value: any;

  /** this is a private method as we dont need to expose it. The intention is to have this check enabled as the first check of this class so we insert this rule at the beginning of the schema */
  private isNumber(): this {
    this.schema.splice(0, 0, () => {
      const input = this.value;
      if (!isNil(input)) {
        if (typeof input === "number" && !isNaN(input)) {
          if (!Number.isFinite(input)) {
            this.errors.push({
              message: "Infinity cannot be validated",
              fnName: "isNumber",
              value: input,
            });
            return false;
          }
          return true;
        } else if (typeof input === "string") {
          const parsed = parseInt(input);
          if (!isNaN(parsed)) {
            this.value = parsed;
            return true;
          } else {
            this.errors.push({
              fnName: "isNumber",
              message: "Unable to cast string to number",
              value: input,
            });
            return false;
          }
        } else {
          this.errors.push({
            fnName: "isNumber",
            message: "Input must be a valid number",
            value: input,
          });
          return false;
        }
      } else {
        // if value is nullable ignore check , this should be handled by required fn
        return true;
      }
    });
    return this;
  }

  public required(): this {
    this.schema.push(() => {
      const input = this.value;
      if (isNil(input)) {
        this.errors.push({
          message: "Field is required",
          fnName: "required",
          value: input,
        });
        return false;
      }
      return true;
    });
    return this;
  }

  public min(minValue: number): this {
    this.schema.push(() => {
      const input = this.value;
      if (!isNil(input) && input < minValue) {
        this.errors.push({
          message: `Number must be greater than or equal to ${minValue}, got ${input}`,
          fnName: "min",
          value: input,
        });
        return false;
      }
      return true;
    });
    return this;
  }

  public max(maxValue: number): this {
    this.schema.push(() => {
      const input = this.value;
      if (!isNil(input) && input > maxValue) {
        this.errors.push({
          message: `Number must be less than or equal to ${maxValue}, got ${input}`,
          fnName: "max",
          value: input,
        });
        return false;
      }
      return true;
    });
    return this;
  }

  public equal(equalValue: number): this {
    this.schema.push(() => {
      const input = this.value;
      if (!isNil(input) && input !== equalValue) {
        this.errors.push({
          message: `Number must be equal to ${equalValue} , got ${input}`,
          fnName: "equal",
          value: input,
        });
        return false;
      }
      return true;
    });
    return this;
  }

  public validate(input: any): number {
    this.errors = [];
    this.value = input;
    this.isNumber(); // default validation
    const isValid = this.schema.every((validator) => validator());
    if (isValid) {
      return this.value;
    }
    throw new Error(JSON.stringify(this.getErrors()));
  }

  public getErrors(): ValidationError[] {
    return this.errors;
  }
}
