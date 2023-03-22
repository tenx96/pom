export const handleValidationError = (
  error: string | undefined,
  customMessage?: string
): string | undefined => {
  // if error is a non null and exists return the customErrorMessage first and then the error
  // if it not exist return an empty string
  return error ? customMessage ?? error : ''
}
