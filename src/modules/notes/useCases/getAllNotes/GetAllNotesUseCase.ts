import { NotFoundError } from '../../../../errors';
import { INotesRepository } from '../../repositories/INotesRepository';

class GetAllNotesUseCase {
  constructor(private notesRepository: INotesRepository) {}

  async execute() {
    const notes = await this.notesRepository.getAll();

    if (!notes) {
      throw new NotFoundError('No notes found');
    }

    return notes;
  }
}

export { GetAllNotesUseCase };
