import { Table } from "drizzle-orm";
import { db } from ".";
import * as schema from "./schema";

export type ExtractStringLiterals<T> = T extends `${string}` ? T : never;
export type SchemaNames = ExtractStringLiterals<keyof typeof db.query>;
export type SchemaType<T extends SchemaNames> = (typeof schema)[T];
export type Columns<T extends SchemaNames> = keyof (typeof schema)[T]["_"]["columns"];
'$inferSelect'

export type PaginatedResponse<T> = {
    data: T[];
    total: number;
  };
  
// export type Columns<T extends Table> = T['_']['columns'];
