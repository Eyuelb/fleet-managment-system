import logger from '@utils/logger';
import { Logger } from 'drizzle-orm';

export class MyLogger implements Logger {
  async logQuery(query: string, params: unknown[]) {
    if (query.toLowerCase().trim().startsWith(`select "session`)) {
      return;
    }
    logger.log(query, params);
  }
}
