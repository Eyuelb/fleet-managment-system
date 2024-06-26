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

export function generateUniqueKey(): string {
  const existingKeys = new Set<string>(); // To store previously generated keys
  const keyLength = 10;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

  while (true) {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // Get current date in YYYYMMDD format

    let key = currentDate; // Start with the current date

    // Generate random characters for the remaining part of the key
    for (let i = 0; i < keyLength - currentDate.length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      key += characters[randomIndex];
    }

    // Check if the key has been generated before
    if (!existingKeys.has(key)) {
      existingKeys.add(key); // Add the key to the set of existing keys
      return key; // Return the unique key
    }
  }
}