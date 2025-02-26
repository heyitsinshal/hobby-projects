import { Context } from 'hono';
import { ZodError } from 'zod';

export const handleZodError = (c: Context, error: ZodError) => {
  const formattedErrors = error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
  return c.json({ errors: formattedErrors }, 400);
};

export const handleUnexpectedError = (c: Context, error: unknown) => {
  console.error(error);
  return c.json({ error: 'Internal Server Error' }, 500);
};
