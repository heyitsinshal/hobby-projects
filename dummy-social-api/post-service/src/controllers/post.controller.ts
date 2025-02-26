import { Context } from 'hono';
import * as postService from '../services/post.service';
import { createPostDto, updatePostDto } from '../dtos/post.dtos';
import { handleZodError, handleUnexpectedError } from '../utils/error.utils';
import { ZodError } from 'zod';

export const getAllPosts = async (c: Context) => {
  try {
    const posts = await postService.getAllPosts();
    return c.json(posts);
  } catch (error) {
    return handleUnexpectedError(c, error);
  }
};

export const getPostById = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'), 10);
    const post = await postService.getPostById(id);
    return c.json(post);
  } catch (error) {
    return handleUnexpectedError(c, error);
  }
};

export const createPost = async (c: Context) => {
  try {
    const body = await c.req.json();
    const parsedBody = createPostDto.parse(body);
    const newPost = await postService.createPost(parsedBody);
    return c.json(newPost);
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError(c, error);
    }
    return handleUnexpectedError(c, error);
  }
};

export const updatePost = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'), 10);
    const body = await c.req.json();
    const parsedBody = updatePostDto.parse(body);
    const updatedPost = await postService.updatePost(id, parsedBody);
    return c.json(updatedPost);
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError(c, error);
    }
    return handleUnexpectedError(c, error);
  }
};

export const deletePost = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'), 10);
    const deletedPost = await postService.deletePost(id);
    return c.json(deletedPost);
  } catch (error) {
    return handleUnexpectedError(c, error);
  }
};
