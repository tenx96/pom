import { isNil } from "../utils/isNil";
import PomValidationError, { ValidationError } from "./PomValidationError";
import { BaseValidator } from "./types/types";

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
          this.errors.push({
            message: "Input must be a valid string",
            fnName: "isString",
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

  public email(): this {
    this.schema.push(() => {
      const input = this.value;
      if (input && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
        this.errors.push({
          fnName: "email",
          message: "Input must be a valid email",
          value: input,
        });
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
        this.errors.push({
          fnName: "required",
          message: "string is required",
          value: input,
        });
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
        this.errors.push({
          message: `string must have at least ${length} characters`,
          fnName: "min",
          value: input,
        });
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
        this.errors.push({
          message: `string must have at most ${length} characters`,
          fnName: "max",
          value: input,
        });
        return false;
      }
      return true;
    });
    return this;
  }

  public regex(pattern: RegExp, message?: string): this {
    this.schema.push(() => {
      const input = this.value;
      if (!pattern.test(input)) {
        this.errors.push({
          message: message || `string must match the regex ${pattern.source}`,
          fnName: "regex",
          value: input,
        });
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
    throw new PomValidationError(this.getErrors());
  }

  public getErrors(): ValidationError[] {
    return this.errors;
  }
}
