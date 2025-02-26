import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { Hono } from 'hono';
import {
  createReply,
  deleteReply,
  getAllReplies,
  getReplyById,
  updateReply,
  getRepliesByParentId,
} from '~/reply/controller';

const app = new Hono();

app.use('*', clerkMiddleware());
app.get('/', (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: 'You are not logged in.',
    });
  }

  return c.json({
    message: 'You are logged in!',
    userId: auth.userId,
  });
});

app.get('/replies', getAllReplies);
app.get('/replies/:id', getReplyById);
app.get('/replies/parent/:parentId', getRepliesByParentId);
app.post('/replies', createReply);
app.put('/replies/:id', updateReply);
app.delete('/replies/:id', deleteReply);

export default {
  port: 8787,
  fetch: app.fetch,
};
