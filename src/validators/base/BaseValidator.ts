export type ValidationFunction = (val: any, customErrorMessage?: string) => string | undefined | boolean

export abstract class BaseValidator<ValueType = any> {
  abstract validate (value: any): ValueType
}
