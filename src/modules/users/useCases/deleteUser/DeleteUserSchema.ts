import { z } from 'zod';

const deleteUserBody = z.object({
  id: z
    .string({
      required_error: 'id is required',
    })
    .uuid('id is not a valid uuid'),
});

export { deleteUserBody };
