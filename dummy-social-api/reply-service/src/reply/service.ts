import { eq, isNull } from 'drizzle-orm';
import { db } from '../app/db';
import { replies } from './model';
import { CreateReplyDto, UpdateReplyDto } from './dtos';

export const getAllReplies = async () => {
  return await db.select().from(replies);
};

export const getReplyById = async (id: number) => {
  const [reply] = await db
    .select()
    .from(replies)
    .where(eq(replies.id, id))
    .limit(1);
  return reply;
};

export const getRepliesByParentId = async (parentId: number | null) => {
  return await db
    .select()
    .from(replies)
    .where(
      parentId === null
        ? isNull(replies.parentId)
        : eq(replies.parentId, parentId)
    );
};

export const createReply = async (data: CreateReplyDto) => {
  return await db.insert(replies).values(data).returning();
};

export const updateReply = async (id: number, data: UpdateReplyDto) => {
  return await db
    .update(replies)
    .set(data)
    .where(eq(replies.id, id))
    .returning();
};

export const deleteReply = async (id: number) => {
  return await db.delete(replies).where(eq(replies.id, id)).returning();
};
