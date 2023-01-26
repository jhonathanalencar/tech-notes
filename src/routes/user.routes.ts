import { Router } from 'express';

import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  updateUserController,
} from '../modules/users/useCases';

const userRoutes = Router();

userRoutes.get('/', (request, response) => {
  return getAllUsersController.handle(request, response);
});

userRoutes.post('/', (request, response) => {
  return createUserController.handle(request, response);
});

userRoutes.patch('/', (request, response) => {
  return updateUserController.handle(request, response);
});

userRoutes.delete('/', (request, response) => {
  return deleteUserController.handle(request, response);
});

export { userRoutes };
