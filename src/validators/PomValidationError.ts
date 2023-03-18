export interface ValidationError {
  value: any;
  message: string;
  fnName: string;
}

export default class PomValidationError extends Error {
  constructor(errors: ValidationError[] = []) {
    const message = errors
      .map((item) => `${item.message}, value: ${item.value}`)
      .join(", ");
    super(message);
    this.name = "PomValidationError";
  }
}
