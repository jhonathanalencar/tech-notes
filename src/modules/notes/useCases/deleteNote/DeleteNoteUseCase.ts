import {
  IDeleteNoteDTO,
  INotesRepository,
} from '../../repositories/INotesRepository';

class DeleteNoteUseCase {
  constructor(private notesRepository: INotesRepository) {}

  async execute(data: IDeleteNoteDTO) {
    await this.notesRepository.delete(data);
  }
}

export { DeleteNoteUseCase };
