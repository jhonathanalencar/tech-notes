import { z } from 'zod';

const createUserbody = z.object({
  username: z
    .string({
      required_error: 'username is required',
    })
    .trim()
    .min(1, 'username is required'),
  password: z
    .string({
      required_error: 'password is required',
    })
    .trim()
    .min(6, 'password must be at least 6 characters long'),
  roles: z
    .array(z.enum(['Employee', 'Admin', 'Manager']), {
      required_error: 'roles is required',
    })
    .length(1, 'roles is required'),
});

export { createUserbody };
