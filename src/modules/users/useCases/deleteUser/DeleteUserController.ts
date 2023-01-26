import { Request, Response } from 'express';
import { deleteUserBody } from './DeleteUserSchema';
import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = deleteUserBody.parse(request.body);

    await this.deleteUserUseCase.execute({
      id,
    });

    return response.status(204).send();
  }
}

export { DeleteUserController };
