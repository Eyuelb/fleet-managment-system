import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { MyLogger } from "./utility/sql-logger";
import envConfig from "@/config/dotenv";

const config = {
  connectionString: envConfig.databaseUrl,
};
const pool = new Pool(config);
const ENABLE_LOGS = false;
pool.on("connect", async (client) => {
  let config = `SELECT set_config('app.user_id', '${'abcd'}', TRUE); `;
  client.query(config);
});

export const db: NodePgDatabase<typeof schema> = drizzle(pool, {
  schema: schema,
  logger: ENABLE_LOGS ? new MyLogger() : false,
  
})
