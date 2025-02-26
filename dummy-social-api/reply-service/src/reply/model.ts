import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const replies = pgTable('replies', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: text('user_id').notNull(),
  postId: integer('post_id').notNull(),
  parentId: integer('parent_id'), // This makes it nullable by default
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});
