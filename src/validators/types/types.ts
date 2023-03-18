export type ValidationFunction = () => boolean;

export abstract class BaseValidator<T = any> {
  abstract validate(value: any): T;
}
