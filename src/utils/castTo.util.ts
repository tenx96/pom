import { isNil } from './isNil'

export const castToBoolean = (val: any) => {
  if (!isNil(val)) {
    if (typeof val === 'boolean') {
      return val
    }

    if (
      val === 'true' ||
      val === 'false' ||
      val === 'True' ||
      val === 'False'
    ) {
      return val.toLowerCase() === 'true'
    }

    throw new Error('Cannot convert value to boolean')
  }
  return val
}

export const castToNumber = (val: any) => {
  if (!isNil(val)) {
    if (typeof val === 'number') {
      if (Number.isFinite(val)) {
        return val
      }
    } else if (typeof val === 'string' && val !== '') {
      const maybeNan = Number(val)
      if (!Number.isNaN(maybeNan)) {
        return maybeNan
      }
    } else if (typeof val === 'boolean') {
      return val ? 1 : 0
    }
    throw new Error('Cannot convert value to number')
  } else {
    return val
  }
}

export const castToString = (val: any) => {
  if (!isNil(val)) {
    if (typeof val === 'string') {
      return val
    } else if (typeof val === 'number') {
      return val.toString()
    } else if (typeof val === 'boolean') {
      return val.toString()
    } else {
      throw new Error('Cannot convert value to string')
    }
  } else {
    return val
  }
}
