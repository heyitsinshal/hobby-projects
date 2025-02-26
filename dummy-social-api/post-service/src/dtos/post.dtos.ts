import { z } from 'zod';

export const createPostDto = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  userId: z.string().min(1, 'User ID is required'),
});

export const updatePostDto = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});
