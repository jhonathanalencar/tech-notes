import { Request, Response } from 'express';
import { updateNoteBody } from './UpdateNoteSchema';
import { UpdateNoteUseCase } from './UpdateNoteUseCase';

class UpdateNoteController {
  constructor(private updateNoteUseCase: UpdateNoteUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id, title, text, completed } = updateNoteBody.parse(request.body);

    await this.updateNoteUseCase.execute({
      id,
      title,
      text,
      completed,
    });

    return response.status(204).send();
  }
}

export { UpdateNoteController };
