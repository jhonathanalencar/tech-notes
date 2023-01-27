import { MongoNotesRepository } from '../../repositories/implementations/MongoNotesRepository';
import { DeleteNoteController } from './DeleteNoteController';
import { DeleteNoteUseCase } from './DeleteNoteUseCase';

const notesRepository = new MongoNotesRepository();
const deleteNoteUseCase = new DeleteNoteUseCase(notesRepository);
const deleteNoteController = new DeleteNoteController(deleteNoteUseCase);

export { deleteNoteController };
