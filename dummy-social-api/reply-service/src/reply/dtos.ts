import { z } from 'zod';

// Request DTOs
export const createReplyDto = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  userId: z.string().min(1, 'User ID is required'),
  postId: z.number().min(1, 'Post ID is required'),
  parentId: z.number().nullable(),
});

export const updateReplyDto = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  postId: z.number().optional(),
  parentId: z.number().nullable().optional(),
});

// Route parameter DTOs
export const idParamDto = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
});

export const parentIdParamDto = z.object({
  parentId: z
    .string()
    .transform((val) => (val === 'null' ? null : parseInt(val, 10))),
});

// Response DTOs
export const replyDto = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  userId: z.string(),
  postId: z.number(),
  parentId: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateReplyDto = z.infer<typeof createReplyDto>;
export type UpdateReplyDto = z.infer<typeof updateReplyDto>;
export type ReplyDto = z.infer<typeof replyDto>;
