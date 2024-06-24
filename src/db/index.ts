import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

import { Pool } from "pg";
const config = {
    connectionString: process.env.DATABASE_URL,
  };
  
const pool = new Pool(config);

export const db: NodePgDatabase<typeof schema> = drizzle(pool, {
  schema,
});

pool.on("connect", (client) => {
  console.log("Data Base Connected Successfully");
});
