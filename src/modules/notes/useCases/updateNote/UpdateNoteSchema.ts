import { z } from 'zod';

const updateNoteBody = z.object({
  id: z
    .string({
      required_error: 'id is required',
    })
    .uuid('id is not a valid uuid'),
  userId: z
    .string({
      required_error: 'userId is required',
    })
    .uuid('id is not a valid uuid'),
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
  completed: z.boolean({
    required_error: 'completed is required',
  }),
});

export { updateNoteBody };
