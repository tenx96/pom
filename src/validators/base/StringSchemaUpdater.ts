// import { StringValidation, StringValidationFn } from "../StringValidator";
// import { BaseUpdater } from "./BaseUpdater";

// export type StringUpdaterFns = StringValidationFn;
// export class StringSchemaUpdater extends BaseUpdater {
//   private _updater: { [key in StringUpdaterFns]?: any } = {};
//   constructor() {
//     super();
   
//   }

//   get updater() {
//     return this._updater;
//   }

//   max(max: number, message?: string): this {
//     this._updater.max = this._validationInstance
//       .getValidators()
//       .max(max, message);
//     return this;
//   }
//   min(min: number, message?: string): this {
//     this._updater.min = this._validationInstance
//       .getValidators()
//       .min(min, message);
//     return this;
//   }
//   required(bool?: boolean, message?: string): this {
//     this._updater.required = this._validationInstance
//       .getValidators()
//       .required(bool, message);
//     return this;
//   }
//   email(message?: string): this {
//     this._updater.email = this._validationInstance
//       .getValidators()
//       .email(message);
//     return this;
//   }
//   regex(pattern: RegExp, message?: string): this {
//     this._updater.regex = this._validationInstance
//       .getValidators()
//       .regex(pattern, message);
//     return this;
//   }
// }
