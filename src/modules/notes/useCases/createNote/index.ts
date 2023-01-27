import { MongoNotesRepository } from '../../repositories/implementations/MongoNotesRepository';
import { CreateNoteController } from './CreateNoteController';
import { CreateNoteUseCase } from './CreateNoteUseCase';

const notesRepository = new MongoNotesRepository();
const createNoteUseCase = new CreateNoteUseCase(notesRepository);
const createNoteController = new CreateNoteController(createNoteUseCase);

export { createNoteController };
