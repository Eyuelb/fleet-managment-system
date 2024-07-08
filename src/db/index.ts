import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
// import { drizzle } from 'drizzle-orm/neon-http';
import { Client, Pool } from "pg";

import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import { cookies } from "next/headers";
import { MyLogger } from "./utility/sql-logger";

const config = {
  connectionString: process.env.DATABASE_URL,
};
const connectionString = process.env.DATABASE_URL!;
const client = neon(connectionString);
const pool = new Pool(config);
const COOKIE_SESSION = "";
const ENABLE_LOGS = true;
pool.on("connect", (client) => {
  const userId = "";

  let config = `SELECT set_config('app.userId', '${userId}', false); `;

  client.query(config);
});

export const db: NodePgDatabase<typeof schema> = drizzle(pool, {
  schema: schema,
  logger: ENABLE_LOGS ? new MyLogger() : false,
});
