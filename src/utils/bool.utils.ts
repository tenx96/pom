import { isNil } from './isNil'

// if true returns nothing if false returns error message
export const isTrue = (value: any) => {
  if (!isNil(value) && value !== true) {
    return 'input is not true'
  }
}

export const isFalse = (value: any) => {
  if (!isNil(value) && value !== false) {
    return 'input is not false'
  }
}

export const isBoolean = (value: any) => {
  //  ignore if nullable
  if (!isNil(value) && typeof value !== 'boolean') {
    return 'input is not a boolean'
  }
}

export const required = (value: any, required?: boolean) => {
  const isRequired = required ?? true
  if (isRequired) {
    if (isNil(value)) {
      return 'input is required'
    }
    if (typeof value !== 'boolean') {
      return 'input is not a boolean'
    }
  }
}
