import { Context } from 'hono';
import * as replyService from './service';
import {
  createReplyDto,
  updateReplyDto,
  idParamDto,
  parentIdParamDto,
  replyDto,
} from './dtos';
import { handleZodError, handleUnexpectedError } from '../utils/error.utils';
import { ZodError } from 'zod';

export const getAllReplies = async (c: Context) => {
  try {
    const replies = await replyService.getAllReplies();
    return c.json(replies.map((reply) => replyDto.parse(reply)));
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError(c, error);
    }
    return handleUnexpectedError(c, error);
  }
};

export const getReplyById = async (c: Context) => {
  try {
    const { id } = idParamDto.parse({ id: c.req.param('id') });
    const reply = await replyService.getReplyById(id);
    return c.json(replyDto.parse(reply));
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError(c, error);
    }
    return handleUnexpectedError(c, error);
  }
};

export const getRepliesByParentId = async (c: Context) => {
  try {
    const { parentId } = parentIdParamDto.parse({
      parentId: c.req.param('parentId'),
    });
    const replies = await replyService.getRepliesByParentId(parentId);
    return c.json(replies.map((reply) => replyDto.parse(reply)));
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError(c, error);
    }
    return handleUnexpectedError(c, error);
  }
};

export const createReply = async (c: Context) => {
  try {
    const body = await c.req.json();
    const parsedBody = createReplyDto.parse(body);
    const newReply = await replyService.createReply(parsedBody);
    return c.json(newReply);
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError(c, error);
    }
    return handleUnexpectedError(c, error);
  }
};

export const updateReply = async (c: Context) => {
  try {
    const { id } = idParamDto.parse({ id: c.req.param('id') });
    const body = await c.req.json();
    const parsedBody = updateReplyDto.parse(body);
    const updatedReply = await replyService.updateReply(id, parsedBody);
    return c.json(updatedReply);
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError(c, error);
    }
    return handleUnexpectedError(c, error);
  }
};

export const deleteReply = async (c: Context) => {
  try {
    const { id } = idParamDto.parse({ id: c.req.param('id') });
    const deletedReply = await replyService.deleteReply(id);
    return c.json(deletedReply);
  } catch (error) {
    return handleUnexpectedError(c, error);
  }
};
