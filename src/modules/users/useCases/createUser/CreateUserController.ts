import { Request, Response } from 'express';

import { UnauthenticatedError } from '../../../../errors';
import { createUserbody } from './CreateUserSchema';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password, roles } = createUserbody.parse(request.body);

    if (
      !request.roles.includes('Admin') &&
      !request.roles.includes('Manager')
    ) {
      throw new UnauthenticatedError('Unauthorized');
    }

    const user = await this.createUserUseCase.execute({
      username,
      password,
      roles,
    });

    return response
      .status(201)
      .json({ message: `New user ${user.username} created` });
  }
}

export { CreateUserController };
