export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export function createSearchParams(obj: Record<string, any>): string {
  const queryString = Object.entries(obj)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return queryString;
}
type AnyObject = { [key: string]: any };

export const objectTrim = (obj: AnyObject, keys?: any[]): AnyObject => {
  // If keys are provided, extract only those keys
  if (keys && keys.length > 0) {
    return keys.reduce((acc, key) => {
      if (obj.hasOwnProperty(key)) {
        acc[key] = obj[key];
      }
      return acc;
    }, {} as AnyObject);
  }

  // If no keys are provided, return the original object
  return obj;
};
