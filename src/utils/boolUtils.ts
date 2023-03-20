import { isNil } from './isNil'

// if true returns nothing if false returns error message
export const isTrue = (value: any) => {
  if (value !== true) {
    return 'input is not true'
  }
}

export const isFalse = (value: any) => {
  if (value !== false) {
    return 'input is not false'
  }
}

export const isBoolean = (value: any) => {
  if (typeof value !== 'boolean') {
    return 'input is not a boolean'
  }
}

export const required = (value: any) => {
  if (isNil(value)) {
    return 'input is required'
  }
  if (typeof value !== 'boolean') {
    return 'input is not a boolean'
  }
}
