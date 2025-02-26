import { defineConfig } from 'drizzle-kit';
import { appConfig } from '~/configs/app.config';

export default defineConfig({
  out: './migrations',
  schema: './src/post/post.model.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: appConfig.DATABASE_URL!,
  },
});
