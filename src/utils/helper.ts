import * as schema from "@db/schema";
import { capitalizeTxt } from "./text";
import { Columns, OrderBy, SchemaNames, SchemaType, Where } from "@db/model";
import { MethodType } from "@models/request";
import { faker } from "@faker-js/faker";

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
export function createSearchParams(obj: Record<string, any>): string {
  const queryString = Object.entries(obj)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
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

export const getSchemaColumns = <T extends SchemaNames>(
  model: T,
  exclude: Columns<T>[]
) => {
  const table = schema[model];

  const columns = Object.keys(table ?? {})
    .filter((data: any) => exclude.includes(data))
    .map((data) => ({
      accessorKey: data,
      header: capitalizeTxt(data),
    }));
  return columns;
};

export const getDataSource = <T extends SchemaNames>(
  model: T,
  valueKey: Columns<T>,
  labelKey: Columns<T>
) => {
  return {
    key: model as any,
    url: `/api/v1/${model}`,
    method: "GET" as MethodType,
    valueKey: valueKey,
    labelKey: labelKey,
  };
};

export function forEach(obj: any, fn: any): any {
  Object.keys(obj).forEach((key) => {
    return fn(obj[key], key);
  });
}

export const generateSeedRows = async <T extends SchemaNames>(
  model: T,
  count: number,
  dataType: () => SchemaType<T>["$inferInsert"]
) => {
  const table = schema[model];
  const rows = faker.helpers.multiple(dataType, {
    count,
  });
  return { table, rows };
};

export const generateQueryParams = <T extends SchemaNames>({model,...props}: {
  model: T;
  select?: Columns<T>[];
  where: Where<T>[];
  orderBy: OrderBy;
  offset: number;
  limit: number;
}) => {

  return JSON.stringify(createSearchParams(props))

};
