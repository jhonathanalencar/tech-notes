import { Router } from 'express';

import { createNoteController } from '../modules/notes/useCases/createNote';
import { deleteNoteController } from '../modules/notes/useCases/deleteNote';
import { getAllNotesController } from '../modules/notes/useCases/getAllNotes';
import { updateNoteController } from '../modules/notes/useCases/updateNote';

const noteRoutes = Router();

noteRoutes.get('/', (request, response) => {
  return getAllNotesController.handle(request, response);
});

noteRoutes.post('/', (request, response) => {
  return createNoteController.handle(request, response);
});

noteRoutes.put('/', (request, response) => {
  return updateNoteController.handle(request, response);
});

noteRoutes.delete('/', (request, response) => {
  return deleteNoteController.handle(request, response);
});

export { noteRoutes };
