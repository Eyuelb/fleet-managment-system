import type { Config } from 'drizzle-kit';

export default {
  dialect:'postgresql',
  schema: './src/db/schema.ts',
  out: './src/db/sql',
  introspect: { casing: 'camel' },
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true
} satisfies Config;
