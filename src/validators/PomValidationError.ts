export interface ValidationError {
  value: any;
  message: string;
  fnName: string;
  inputName?: string
}

export default class PomValidationError extends Error {
  public errors: ValidationError[];
  constructor(errors: ValidationError | ValidationError[] = []) {
    let errs = errors ? (Array.isArray(errors) ? errors : [errors]) : [];
    const message = errs.map((item) => `${item.message}`).join(", ");
    super(message);
    this.errors = errs;
    this.name = "PomValidationError";
  }

  get latestError(): ValidationError {
    if (this.errors.length) {
      return this.errors[this.errors.length - 1];
    } else {
      return {
        fnName: "unknown",
        message: "validation failed",
        value: undefined,
      };
    }
  }
}
