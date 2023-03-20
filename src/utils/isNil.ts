export const isNil = (value: any) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    // is nullable
    return true
  } else {
    return false
  }
}
