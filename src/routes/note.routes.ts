import { Router } from 'express';

import { getAllNotesController } from '../modules/notes/useCases/getAllNotes';

const noteRoutes = Router();

noteRoutes.get('/', (request, response) => {
  return getAllNotesController.handle(request, response);
});

export { noteRoutes };
