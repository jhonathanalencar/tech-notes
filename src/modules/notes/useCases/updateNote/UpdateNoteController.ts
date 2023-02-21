import { Request, Response } from 'express';

import { updateNoteBody } from './UpdateNoteSchema';
import { UpdateNoteUseCase } from './UpdateNoteUseCase';

class UpdateNoteController {
  constructor(private updateNoteUseCase: UpdateNoteUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id, userId, title, text, completed } = updateNoteBody.parse(
      request.body
    );

    const isManagerOrAdmin =
      request.roles.includes('Manager') || request.roles.includes('Admin');

    await this.updateNoteUseCase.execute({
      id,
      userId,
      title,
      text,
      completed,
      isManagerOrAdmin,
    });

    return response.status(204).send();
  }
}

export { UpdateNoteController };
