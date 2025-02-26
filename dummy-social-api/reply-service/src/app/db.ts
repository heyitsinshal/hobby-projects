import { drizzle } from 'drizzle-orm/neon-http';
import { appConfig } from '~/configs/app.config';

export const db = drizzle(appConfig.DATABASE_URL!);
