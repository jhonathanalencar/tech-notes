import { MongoNotesRepository } from '../../repositories/implementations/MongoNotesRepository';
import { GetAllNotesController } from './GetAllNotesController';
import { GetAllNotesUseCase } from './GetAllNotesUseCase';

const notesRepository = new MongoNotesRepository();
const getAllNotesUseCase = new GetAllNotesUseCase(notesRepository);
const getAllNotesController = new GetAllNotesController(getAllNotesUseCase);

export { getAllNotesController };
