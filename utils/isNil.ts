export const isNil = (value: any) => {
    if (value === null || value === undefined) {
        // is nullable
        return true
    } else {
        return false
    }
}