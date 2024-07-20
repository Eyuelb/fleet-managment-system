import envConfig from '@/config/dotenv';
import type { Config } from 'drizzle-kit';

export default {
  dialect:'postgresql',
  schema: './src/db/schema.ts',
  out: './src/db/sql',
  introspect: { casing: 'camel' },
  dbCredentials: {
    url: envConfig.databaseUrl,
  },
  verbose: true
} satisfies Config;
