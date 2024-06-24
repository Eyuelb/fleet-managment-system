import dayjs from "dayjs";

type DataType =
  | "string"
  | "number"
  | "boolean"
  | "array"
  | "date"
  | "currency"
  | "options"
  | "getValue"; // Updated to 'getObject'

type FormattedData<T extends DataType> = T extends "string"
  ? string
  : T extends "number"
  ? number
  : T extends "boolean"
  ? boolean
  : T extends "date"
  ? string
  : T extends "currency"
  ? string
  : T extends "array"
  ? any[]
  : T extends "options"
  ? { value: string; label: string }[]
  : T extends "getValue" // Updated to 'getObject'
  ? any // Return type for 'getObject', can be any since it's dynamic
  : never;

type ObjWithKeys<T extends string, U extends string> = {
  [key in T]: string;
} & { [key in U]: string };

type getObject<T extends object, K extends keyof T> = T[K]; // Updated to getObject

interface FormatOptions<T extends DataType> {
  data: any;
  type: T;
  prefix?: string;
  valueKey?: string;
  labelKey?: string;
  placeHolderData?: FormattedData<T>; // New optional parameter
  dateFormat?: string; // New optional parameter for date formatting
  joinBy?: string; // to bind multiple values in the label
}

function formatData<T extends DataType>({
  data,
  type,
  prefix,
  valueKey,
  labelKey,
  placeHolderData,
  joinBy,
  dateFormat = "MMMM DD, YYYY HH:mm:ss", // Default format
}: FormatOptions<T>): FormattedData<T> {
  switch (type) {
    case "string":
      return String(data) as FormattedData<T>;
    case "number":
      return Number(data) as FormattedData<T>;
    case "boolean":
      return Boolean(data) as FormattedData<T>;
    case "date":
      const date = dayjs(data, dateFormat);
      if (!date.isValid()) {
        if (placeHolderData !== undefined) {
          return placeHolderData;
        }
        throw new Error("Invalid date format");
      }
      return date.format(dateFormat) as FormattedData<T>;
    case "currency":
      if (typeof data !== "number") {
        if (placeHolderData !== undefined) {
          return placeHolderData;
        }
        throw new Error("Data is not a number");
      }
      return ((prefix ? `${prefix} ` : "$ ") +
        data.toLocaleString(undefined, {
          useGrouping: true,
        })) as FormattedData<T>;
    case "array":
      if (!Array.isArray(data)) {
        if (placeHolderData !== undefined) {
          return placeHolderData;
        }
        return [] as FormattedData<T>;
      }
      return data as FormattedData<T>;
    case "options":
      return processData(
        data,
        valueKey,
        labelKey,
        placeHolderData,
        joinBy
      ) as FormattedData<T>;
    case "getValue": // Updated to 'getObject'
      if (typeof data !== "object" || !valueKey) {
        if (placeHolderData !== undefined) {
          return placeHolderData;
        }
        throw new Error("Value key not provided");
      }
      return getValue(data, valueKey) as FormattedData<T>;
    default:
      if (placeHolderData !== undefined) {
        return placeHolderData;
      }
      throw new Error("Unsupported data type");
  }
}
function getValue<T extends object, K extends keyof T>(
  obj: T,
  key: K
): getObject<T, K> {
  return obj[key];
}

function convertArrayToObject<T extends string, U extends string>(
  arr: ObjWithKeys<T, U>[],
  valueKey: T,
  labelKey: U
): { value: string; label: string }[] {
  const uniqueValues = new Set<string>(); // Set to store unique values
  return arr
    .filter((obj) => {
      const value = obj[valueKey];
      const label = obj[labelKey];
      if (label === null || value === null) {
        return false; // Include the object if the value is unique
      }
      if (!uniqueValues.has(value)) {
        uniqueValues.add(value); // Add value to set if not already present

        return true; // Include the object if the value is unique
      }
      return false; // Exclude the object if the value is duplicate
    })
    .filter((obj) => obj[valueKey] && obj[labelKey])
    .map((obj) => ({
      value: obj[valueKey],
      label: obj[labelKey],
    }));
}
interface DataItem {
  label: string;
  value: any;
}
function processData(
  data: any,
  valueKey?: string,
  labelKey?: string | string[],
  placeholder: any = [],
  joinBy: string = " "
): DataItem[] {
  const uniqueValues = new Set<string>(); // Set to store unique values

  if (Array.isArray(data)) {
    if (!Array.isArray(labelKey) && labelKey && valueKey) {
      return data
        .map((item, index) => ({
          label:
            item[labelKey] !== undefined && item[labelKey] !== null
              ? item[labelKey]
              : "",
          value:
            item[valueKey] !== undefined && item[valueKey] !== null
              ? item[valueKey]
              : index,
        }))
        .filter((obj) => {
          const value = obj.value;
          if (!uniqueValues.has(value)) {
            uniqueValues.add(value); // Add value to set if not already present

            return true; // Include the object if the value is unique
          }
          return false; // Exclude the object if the value is duplicate
        });
    } else if (Array.isArray(labelKey) && valueKey) {
      return data
        .map((item, index) => ({
          label: labelKey
            .map((key) => item[key])
            .filter((label) => label !== undefined && label !== null)
            .join(joinBy),
          value:
            item[valueKey] !== undefined && item[valueKey] !== null
              ? item[valueKey]
              : index,
        }))
        .filter((obj) => {
          const value = obj.value;
          if (!uniqueValues.has(value)) {
            uniqueValues.add(value); // Add value to set if not already present

            return true; // Include the object if the value is unique
          }
          return false; // Exclude the object if the value is duplicate
        });
    } else {
      return data.map((item, index) => ({
        label: item !== undefined && item !== null ? item : "",
        value: String(index),
      }));
    }
  } else if (typeof data === "object") {
    return Object.keys(data).map((key, index) => ({
      label: data[key] !== undefined && data[key] !== null ? data[key] : "",
      // custom for org
      value:
        data[key] !== undefined && data[key] !== null
          ? data[key].replace(" ", "_")
          : "",
    }));
  } else {
    return placeholder;
  }
}
export default formatData;
