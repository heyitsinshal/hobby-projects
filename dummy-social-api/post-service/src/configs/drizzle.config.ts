import { defineConfig } from 'drizzle-kit';
import { appConfig } from '~/configs/app.config';

export default defineConfig({
  out: './migrations',
  schema: './src/models/*',
  dialect: 'postgresql',
  dbCredentials: {
    url: appConfig.DATABASE_URL!,
  },
});
