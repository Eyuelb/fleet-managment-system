
import { count, desc } from 'drizzle-orm';
import { db } from '.';
import logger from '@utils/logger';
import { PaginatedResponse } from './model';

export async function getPaginatedData<T>({
  table,
  where,
  orderBy,
  page = 1,
  pageSize = 10,
}: {
  table: any;
  where?: any;
  orderBy?: any;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResponse<T>> {
  try {
    return await db.transaction(async (tx) => {
      const data = tx
        .select()
        .from(table)
        .where(where)
        .orderBy(orderBy ?? (table?.createdAt && desc(table.createdAt)))
        .limit(pageSize)
        .offset(page ? (page - 1) * pageSize : 0);

      const total = tx.select({ value: count() }).from(table).where(where);

      const [d, [t]] = await Promise.all([data, total]);

      return { data: d as T[], total: t.value };
    });
  } catch (err) {
    logger.log(err);
    throw err;
  }
}
