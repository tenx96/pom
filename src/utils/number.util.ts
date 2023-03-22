import { isNil } from './isNil'

export const max = (max: number, value: any) => {
  if (value && value > max) {
    return `input must have maximum ${max} characters`
  }
}

export const min = (min: number, value: any) => {
  if (value && value < min) {
    return `input must have at least ${min} characters`
  }
}

export const equal = (equal: number, value: any) => {
  if (value && value !== equal) {
    return `input must be equal ${equal}`
  }
}

export const positive = (value: any) => {
  if (value && value < 0) {
    return 'input must be positive'
  }
}

export const negative = (value: any) => {
  if (value && value > 0) {
    return 'input must be negative'
  }
}

export const required = (value: any, required?: boolean) => {
  const isRequired = required ?? true

  if (isRequired) {
    if (isNil(value)) {
      return 'input is required'
    }

    if (typeof value !== 'number') {
      return 'input is not a number'
    }
  }
}
