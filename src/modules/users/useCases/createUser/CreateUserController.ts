import { Request, Response } from 'express';

import { createUserbody } from './CreateUserSchema';
import { CreateUserUseCase } from './CreateUserUseCase';

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
