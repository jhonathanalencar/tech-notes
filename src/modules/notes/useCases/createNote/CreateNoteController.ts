import { Request, Response } from 'express';
import { createNoteBody } from './CreateNoteSchema';
import { CreateNoteUseCase } from './CreateNoteUseCase';

class CreateNoteController {
  constructor(private createNoteUseCase: CreateNoteUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { userId, text, title } = createNoteBody.parse(request.body);

    const note = await this.createNoteUseCase.execute({
      userId,
      text,
      title,
    });

    return response.status(201).json(note);
  }
}

export { CreateNoteController };
