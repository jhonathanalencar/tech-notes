import { z } from 'zod';

const createNoteBody = z.object({
  userId: z
    .string({
      required_error: 'userId is required',
    })
    .uuid('userId is not a valid uuid'),
  title: z
    .string({
      required_error: 'title is required',
    })
    .trim()
    .min(1, 'title is required'),
  text: z
    .string({
      required_error: 'text is required',
    })
    .trim()
    .min(1, 'text is required'),
});

export { createNoteBody };
