import { isNil } from "../utils/isNil";
import { BaseValidator } from "./types/types";

type ValidationError = string;

type ValidationFunction = () => boolean;

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
          return true;
        } else {
          this.errors.push("Input must be a valid number");
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
        this.errors.push("Field is required");
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
        this.errors.push(`Number must be greater than or equal to ${minValue}`);
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
        this.errors.push(`Number must be less than or equal to ${maxValue}`);
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
        this.errors.push(`Number must be equal to ${equalValue}`);
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