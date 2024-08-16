import { getSource } from "@/config/resources";
import { db } from "@db/index";
import { queryBuilder } from "@db/manage";
import { QueryParams } from "@db/model";
import { Session } from "@lib/auth/auth.model";
import { ApiResources } from "@models/resources";
import { eq } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const useApiService = async (
  modelName: ApiResources,
  session?: Session | undefined
) => {
  const model = getSource(modelName).model;
  const insertSchema = createInsertSchema(model);
  type InsertModel = z.infer<typeof insertSchema>;
  const user = session?.user;
  const userId = user?.id;
  return {
    async getAll() {
      try {
        return await db.select().from(model);
      } catch (error) {
        console.error(`Error fetching all records: ${error}`);
        throw error;
      }
    },
    async getById(id: string) {
      try {
        return await db.select().from(model).where(eq(model.id, id));
      } catch (error) {
        console.error(`Error fetching record by ID: ${error}`);
        throw error;
      }
    },
    async insert(value: InsertModel) {
      try {
        const currentTime = new Date().toISOString();

        return await db
          .insert(model)
          .values({
            ...value,
            createdBy: userId,
            updatedBy: userId,
            createdAt: currentTime,
            updatedAt: currentTime,
          })
          .returning({
            id: model.id,
          });
      } catch (error) {
        console.error(`Error inserting record: ${error}`);
        throw error;
      }
    },
    async update(data: InsertModel, id: string) {
      try {
        const currentTime = new Date().toISOString();

        return await db
          .update(model)
          .set({
            ...data,
            updatedBy: userId,
            updatedAt: currentTime,
          })
          .where(eq(model.id, id));
      } catch (error) {
        console.error(`Error updating record: ${error}`);
        throw error;
      }
    },
    async remove(id: string) {
      try {
        return await db.delete(model).where(eq(model.id, id));
      } catch (error) {
        console.error(`Error deleting record: ${error}`);
        throw error;
      }
    },
    async getByQuery(queryParams: QueryParams<any>) {
      try {
        const result = await queryBuilder(queryParams.model)
          .select(queryParams.select)
          .where(queryParams.where ?? [])
          .orderBy(queryParams.orderBy?.by, queryParams.orderBy?.direction)
          .limit(queryParams.limit)
          .offset(queryParams.offset)
          .build();
        return { ...result, ...queryParams };
      } catch (error) {
        console.error(`Error executing query: ${error}`);
        throw error;
      }
    },
    insertSchema: createInsertSchema(model),
    selectSchema: createSelectSchema(model),
  };
};
