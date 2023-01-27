import { z } from 'zod';

const deleteNoteBody = z.object({
  id: z
    .string({
      required_error: 'id is required',
    })
    .uuid('id is not a valid uuid'),
});

export { deleteNoteBody };
