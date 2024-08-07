import { count, getTableColumns, SQL, sql } from "drizzle-orm";
import * as schema from "./schema";
import {
  Columns,
  FilterOperators,
  OrderBy,
  SchemaNames,
  SchemaType,
  Where,
} from "./model";
import { objectTrim } from "@utils/helper";
import { db } from ".";
import logger from "@utils/logger";

export function queryBuilder<T extends SchemaNames>(tableName: T) {
  return buildQuery(tableName);
}

function buildQuery<T extends SchemaNames>(tableName: T) {
  type ColumnT = Columns<T>;

  const table = schema[tableName];
  type TableT = SchemaType<T>;

  let state = {
    selectColumns: [] as ColumnT[],
    conditions: [] as SQL<string>[],
    limit: undefined as number | undefined,
    offset: undefined as number | undefined,
    orderBy: [] as SQL<string>[],
  };

  const select = (columns?: ColumnT[]) => {
    state.selectColumns = columns ?? [];
    return methods;
  };

  const where = (conditions: Where<T>[]) => {
    state.conditions.push(
      ...conditions
        .filter((c) => c.value)
        .map((condition: Where<T>) => {
          const { column, value, operator } = condition;
          return sql<string>`${table[column]} ${sql.raw(
            FilterOperators[operator]
          )} ${value}`;
        // )} ${"%" + value + "%"}`;
        })
    );
    return methods;
  };

  const limit = (limit: number | undefined) => {
    if (limit) state.limit = limit;
    return methods;
  };

  const offset = (offset: number | undefined) => {
    if (offset) state.offset = offset;
    return methods;
  };

  const orderBy = (
    columns: ColumnT[] | undefined,
    directions: OrderBy[] | undefined
  ) => {
    if (columns && directions)
      state.orderBy = columns.map(
        (column, index) => sql`${table[column]} ${sql.raw(directions[index])}`
      );
    return methods;
  };

  const handleConditions = () => {
    if (state.conditions.length > 0) {
      const finalSql = sql.empty();
      for (let i = 0; i < state.conditions.length; i++) {
        finalSql.append(state.conditions[i]);
        if (i < state.conditions.length - 1) {
          finalSql.append(sql` AND `);
        }
      }
      return finalSql;
    }
    return undefined;
  };
  const handleOrderBy = (query: any) => {
    if (state.orderBy.length > 0) {
      for (let i = 0; i < state.orderBy.length; i++) {
        query = query.orderBy(state.orderBy[i]);
      }
    }
    return query;
  };

  const handleLimit = (query: any) => {
    if (state.limit !== undefined) {
      query = query.limit(state.limit);
    }
    return query;
  };

  const handleOffset = (query: any) => {
    if (
      state.offset !== undefined &&
      state.offset > 0 &&
      state.limit !== undefined
    ) {
      query = query.offset((state.offset - 1) * state.limit);
    }
    return query;
  };

  const build = async () => {
    try {
      return await db.transaction(async (tx) => {
        const columns = objectTrim(getTableColumns(table), state.selectColumns);
        // let selectedColumns = state.selectColumns.reduce((acc, key) => {
        //   if (getTableColumns(table).hasOwnProperty(key)) {
        //     acc[key] = getTableColumns(table)[key];
        //   }
        //   return acc;
        // }, {} as TableT["_"]["columns"]);

        const finalSql = handleConditions();
        let query = tx.select(columns).from(table).where(finalSql);
        query = handleOrderBy(query);
        query = handleLimit(query);
        query = handleOffset(query);
        const total = tx.select({ value: count() }).from(table);

        const [d, [t]] = await Promise.all([query, total]);
        return { content: d, total: t.value };
      });
    } catch (err) {
      logger.log(err);
      throw err;
    }
  };

  const methods = {
    select,
    where,
    limit,
    offset,
    orderBy,
    build,
  };

  return methods;
}
