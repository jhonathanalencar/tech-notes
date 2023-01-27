import { Request, Response } from 'express';

import { GetAllNotesUseCase } from './GetAllNotesUseCase';

class GetAllNotesController {
  constructor(private getAllNotesUseCase: GetAllNotesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const notes = await this.getAllNotesUseCase.execute();

    return response.status(200).json(notes);
  }
}

export { GetAllNotesController };
