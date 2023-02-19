import { Request, Response } from 'express';
import { UnauthenticatedError } from '../../../../errors';

import { updateUserBody } from './UpdateUserSchema';
import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id, username, roles, active, password } = updateUserBody.parse(
      request.body
    );

    if (
      !request.roles.includes('Admin') &&
      !request.roles.includes('Manager')
    ) {
      throw new UnauthenticatedError('Unauthorized');
    }

    await this.updateUserUseCase.execute({
      id,
      username,
      roles,
      active,
      password,
    });

    return response.status(204).send();
  }
}

export { UpdateUserController };
