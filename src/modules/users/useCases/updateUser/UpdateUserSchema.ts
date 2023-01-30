import { z } from 'zod';

const updateUserBody = z.object({
  id: z
    .string({
      required_error: 'id is required',
    })
    .uuid({
      message: 'id is not a valid uuid',
    }),
  username: z
    .string({
      required_error: 'username is required',
    })
    .trim()
    .min(1, 'username is required'),
  roles: z
    .array(z.enum(['Employee', 'Admin', 'Manager']), {
      required_error: 'roles is required',
    })
    .min(1, 'roles is required'),
  active: z.boolean({
    required_error: 'active is required',
  }),
  password: z
    .string()
    .min(6, 'password must be at least 6 characters long')
    .optional(),
});

export { updateUserBody };
