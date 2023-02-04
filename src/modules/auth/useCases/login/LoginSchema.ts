import { z } from 'zod';

const loginBody = z.object({
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
    .min(1, 'password is required'),
});

export { loginBody };
