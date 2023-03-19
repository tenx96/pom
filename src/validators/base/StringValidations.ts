import { isNil } from "../../utils/isNil";

export const email = (value: any) => {
  if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Input must be a valid email";
  }
};

export const required = (value: any, required?: boolean) => {
  const isRequired = required ?? true;
  if (isRequired && (isNil(value) || value === "")) {
    return "input is required";
  }
};

export const min = (min: number, value: any) => {
  if (value && value.length < min) {
    return `input must have at least ${min} characters`;
  }
};
export const max = (max: number, value: any) => {
  if (value && value.length > max) {
    return `input must have maximum ${max} characters`;
  }
};

export const regex = (pattern: RegExp, value: any) => {
  if (!pattern.test(value)) {
    return `string must match the regex ${pattern.source}`;
  }
};
