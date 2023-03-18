export abstract class BaseValidator<T = any> {
  abstract validate(value: any): T;
  abstract getErrors(): string[];
}


export type ValidationError = string;

export type ValidationFunction = () => boolean;
