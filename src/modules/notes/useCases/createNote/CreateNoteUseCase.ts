import {
  ICreateNoteDTO,
  INotesRepository,
} from '../../repositories/INotesRepository';

class CreateNoteUseCase {
  constructor(private notesRepository: INotesRepository) {}

  async execute(data: ICreateNoteDTO) {
    const note = await this.notesRepository.create(data);

    return note;
  }
}

export { CreateNoteUseCase };
