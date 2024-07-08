import { db } from "@db/index";
import { SchemaNames } from "@db/model";
import * as schema from "@db/schema";
import { ApiResources } from "@models/resources";
import { eq } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const useApiService = (modelName: ApiResources) => {
  const model = schema[modelName as SchemaNames];
  type InsertModel = typeof model.$inferInsert;

  return {
    async getAll() {
      return await db.select().from(model);
    },
    async getById(id: string) {
      return await db.select().from(model).where(eq(model.id, id));
    },
    async insert(value: InsertModel) {
      return await db.insert(model).values(value).returning({
        id: model.id,
      });
    },
    async update(data: InsertModel, id: string) {
      return await db.update(model).set(data).where(eq(model.id, id));
    },
    async remove(id: string) {
      return await db.delete(model).where(eq(model.id, id));
    },
    insertSchema: createInsertSchema(model),
    selectSchema: createSelectSchema(model),
  };
};
