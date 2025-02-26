import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { Hono } from 'hono';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from '~/post/controller';

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

app.get('/posts', getAllPosts);
app.get('/posts/:id', getPostById);
app.post('/posts', createPost);
app.put('/posts/:id', updatePost);
app.delete('/posts/:id', deletePost);

export default {
  port: 8787,
  fetch: app.fetch,
};
