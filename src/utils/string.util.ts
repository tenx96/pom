import { isNil } from './isNil'

const rEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
export const email = (value: any) => {
  if (value && !rEmail.test(value)) {
    return 'input must be a valid email'
  }
}

export const required = (value: any, required?: boolean) => {
  const isRequired = required ?? true
  if (isRequired && (isNil(value) || value === '')) {
    return 'input is required'
  }
}

export const min = (min: number, value: any) => {
  if (!isNil(value) && value.length < min) {
    return `input must have at least ${min} characters`
  }
}
export const max = (max: number, value: any) => {
  if (value && value.length > max) {
    return `input must have maximum ${max} characters`
  }
}

export const regex = (pattern: RegExp, value: any) => {
  if (!pattern.test(value)) {
    return `input must match the regex ${pattern.source}`
  }
}
