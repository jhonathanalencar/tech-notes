import {
  INotesRepository,
  IUpdateNoteDTO,
} from '../../repositories/INotesRepository';

class UpdateNoteUseCase {
  constructor(private notesRepository: INotesRepository) {}

  async execute(data: IUpdateNoteDTO) {
    await this.notesRepository.update(data);
  }
}

export { UpdateNoteUseCase };
