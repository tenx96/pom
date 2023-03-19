export type ValidationFunction = (val : any) => boolean;

export abstract class BaseValidator<ValueType = any> {
  abstract validate(value: any): ValueType;
}
