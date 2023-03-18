import { isNil } from "../utils/isNil";
import { BaseValidator } from "./types/types";

type ValidationError = string;

type ValidationFunction = () => boolean;

export class StringValidation extends BaseValidator<string> {
  private schema: ValidationFunction[] = [];
  private errors: ValidationError[] = [];
  private value: any;

  /** this is a private method as we dont need to expose it. The intention is to have this check enabled as the first check of this class so we insert this rule at the beginning of the schema */
  private isString(): this {
    this.schema.splice(0, 0, () => {
      const input = this.value;
      if (!isNil(input)) {
        if (typeof input === "string") {
          return true;
        } else if (typeof input === "number") {
          this.value = input.toString();
          return true;
        } else {
          this.errors.push("Input must be a valid string");
          return false;
        }
      } else {
        // if value is nullable ignore check , this should be handled by required fn
        return true;
      }
    });
    return this;
  }

  public email(): this {
    this.schema.push(() => {
      const input = this.value;
      if (input && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
        this.errors.push("Invalid email format");
        return false;
      }
      return true;
    });
    return this;
  }

  public required(): this {
    this.schema.push(() => {
      const input = this.value;
      if (isNil(input) || input === "") {
        this.errors.push("Field is required");
        return false;
      }
      return true;
    });
    return this;
  }

  public min(length: number): this {
    this.schema.push(() => {
      const input = this.value;
      if (input && input.length < length) {
        this.errors.push(`Field must have at least ${length} characters`);
        return false;
      }
      return true;
    });
    return this;
  }

  public max(length: number): this {
    this.schema.push(() => {
      const input = this.value;
      if (input && input.length > length) {
        this.errors.push(`Field must have at most ${length} characters`);
        return false;
      }
      return true;
    });
    return this;
  }

  public regex(pattern: RegExp, message: string): this {
    this.schema.push(() => {
      const input = this.value;
      if (!pattern.test(input)) {
        this.errors.push(
          message || `Field must match the regex ${pattern.source}`
        );
        return false;
      }
      return true;
    });
    return this;
  }

  public validate(input: any): string {
    this.errors = [];
    this.value = input;
    this.isString(); // default validation
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
