import dayjs from "dayjs";
import { FieldType } from "../model";

export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

const DataMap = {
  text: "",
  textarea: "",
  number: 0,
  boolean: false,
  checkbox: false,
  select: "",
  "multi-select": [],
  email: "",
  password: "",
  date: "", // Default to today's date
  array: [],
  object: {},
  time: dayjs().format("HH:mm"), // Default to current time
  datetime: dayjs().format("YYYY-MM-DDTHH:mm"), // Default to current date and time
  url: "",
  phone: "",
  currency: 0,
  file: null,
  color: "#000000",
  percentage: 0,
  rating: 0,
  range: 0,
  country: "",
  language: "",
  timezone: "",
};
export const contractDefaultValue = (formConfig: FieldType[]) => {
  const transformedObject: { [key: string]: any } = {};

  formConfig.forEach((item) => {
    //@ts-ignore
    transformedObject[item.name] = DataMap[item.type];
  });
  return transformedObject;
};

export function createNestedObject(path: string, value: any): any {
  const parts = path.split(".");
  if (parts.length > 0) {
    return value;
  }
  let obj: any = {};

  let currentObj = obj;
  for (let i = 0; i < parts.length; i++) {
    const key = parts[i];
    if (i === parts.length - 1) {
      // Last part of the path, assign the value
      currentObj[key] = value;
    } else {
      // Check if the key exists, otherwise create an empty object
      currentObj[key] = currentObj[key] || {};
      // Move to the next level of the object
      currentObj = currentObj[key];
    }
  }

  return obj;
}

interface ParsedInput {
  name: string;
  target: string;
}
export const parseInputString = (inputString: string): ParsedInput => {
  if (!inputString.includes("."))
    return {
      name: inputString,
      target: "value",
    };
  const [name, target] = inputString.split(".");
  return {
    name,
    target,
  };
};
interface DataItem {
  label: string;
  value: any;
}

export function getLabel(data: DataItem[], value: string): string {
  const dataItem = data.find((item, index) => item.value === value);
  return dataItem ? dataItem.label : "";
}
export function getOption(
  options: DataItem[],
  value: string,
  by: "label" | "value" = "value"
): string {
  const dataItem = options.find((item, index) => item.value === value);
  return dataItem ? dataItem[by] : "";
}
export function isEmptyObject(data: DataItem[], value: string): string {
  const dataItem = data.find((item, index) => item.value === value);
  return dataItem ? dataItem.label : "";
}

export function isObjectEmpty(obj: any): boolean {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function isArrayEmpty(array: any): boolean {
  return Array.isArray(array) && array.length > 0;
}
export const isEvent = (
  value: any
): value is React.ChangeEvent<HTMLInputElement> => {
  return value && typeof value === "object" && value.hasOwnProperty("target");
};

interface ObjectWithKey {
  [key: string]: any;
}

export const matchArraysByKey = (
  arr1: ObjectWithKey[],
  arr2: ObjectWithKey[],
  key: string
) => arr1.map((obj) => ({
  ...obj,
  ...arr2.find((map) => obj[key] === map[key]),
}))


export function randomId() {
  return `random-id-${Math.random().toString(36).slice(2, 11)}`;
}