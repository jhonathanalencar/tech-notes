import { Request, Response } from 'express';
import { UnauthenticatedError } from '../../../../errors';

import { GetAllUsersUseCase } from './GetAllUsersUseCase';

class GetAllUsersController {
  constructor(private getAllUsersUseCase: GetAllUsersUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    if (
      !request.roles.includes('Admin') &&
      !request.roles.includes('Manager')
    ) {
      throw new UnauthenticatedError('Unauthorized');
    }

    const users = await this.getAllUsersUseCase.execute();

    if (!users) {
      return response.status(400).json({ error: 'No users found' });
    }

    return response.status(200).json(users);
  }
}

export { GetAllUsersController };
