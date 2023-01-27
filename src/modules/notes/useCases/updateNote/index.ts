import { MongoNotesRepository } from '../../repositories/implementations/MongoNotesRepository';
import { UpdateNoteController } from './UpdateNoteController';
import { UpdateNoteUseCase } from './UpdateNoteUseCase';

const notesRepository = new MongoNotesRepository();
const updateNoteUseCase = new UpdateNoteUseCase(notesRepository);
const updateNoteController = new UpdateNoteController(updateNoteUseCase);

export { updateNoteController };
