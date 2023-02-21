import { Request, Response } from 'express';

import { UnauthenticatedError } from '../../../../errors';
import { deleteNoteBody } from './DeleteNoteSchema';
import { DeleteNoteUseCase } from './DeleteNoteUseCase';

class DeleteNoteController {
  constructor(private deleteNoteUseCase: DeleteNoteUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = deleteNoteBody.parse(request.body);

    if (
      !request.roles.includes('Manager') &&
      !request.roles.includes('Admin')
    ) {
      throw new UnauthenticatedError('Unauthorized');
    }

    await this.deleteNoteUseCase.execute({
      id,
    });

    return response.status(204).send();
  }
}

export { DeleteNoteController };
