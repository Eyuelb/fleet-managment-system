import { drizzle,type NodePgDatabase } from 'drizzle-orm/node-postgres';
// import { drizzle } from 'drizzle-orm/neon-http';
import { Client, Pool } from "pg";

import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

const config = {
    connectionString: process.env.DATABASE_URL,
  };
const connectionString = process.env.DATABASE_URL!;
const client = neon(connectionString);
const pool = new Pool(config);

export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema: schema, logger: true });


