export const isBrowser: boolean = typeof document !== 'undefined'

export function isArrayEmpty(array: any): boolean {
    return Array.isArray(array) && array.length > 0;
  }