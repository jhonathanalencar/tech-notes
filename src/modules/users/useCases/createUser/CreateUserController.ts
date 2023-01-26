import { Request, Response } from 'express';
import { z } from 'zod';

import { CreateUserUseCase } from './CreateUserUseCase';

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
    .min(6, 'password must be at leat 6 characters long'),
  roles: z
    .array(z.enum(['Employee', 'Admin', 'Manager']), {
      required_error: 'roles is required',
    })
    .length(1, 'roles is required'),
});

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password, roles } = createUserbody.parse(request.body);

    const user = await this.createUserUseCase.execute({
      username,
      password,
      roles,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
