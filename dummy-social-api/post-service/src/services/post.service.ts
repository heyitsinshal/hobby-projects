import { eq } from 'drizzle-orm';
import { db } from '~/app/db';
import { posts } from '~/models/post.model';

export const getAllPosts = async () => {
  return await db.select().from(posts);
};

export const getPostById = async (id: number) => {
  const [post] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return post;
};

export const createPost = async (data: {
  title: string;
  content: string;
  userId: string;
}) => {
  return await db.insert(posts).values(data).returning();
};

export const updatePost = async (
  id: number,
  data: { title?: string; content?: string }
) => {
  return await db.update(posts).set(data).where(eq(posts.id, id)).returning();
};

export const deletePost = async (id: number) => {
  return await db.delete(posts).where(eq(posts.id, id)).returning();
};
