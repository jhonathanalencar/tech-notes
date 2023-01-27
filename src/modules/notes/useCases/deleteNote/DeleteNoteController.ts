import { Request, Response } from 'express';

import { deleteNoteBody } from './DeleteNoteSchema';
import { DeleteNoteUseCase } from './DeleteNoteUseCase';

class DeleteNoteController {
  constructor(private deleteNoteUseCase: DeleteNoteUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = deleteNoteBody.parse(request.body);

    await this.deleteNoteUseCase.execute({
      id,
    });

    return response.status(204).send();
  }
}

export { DeleteNoteController };
