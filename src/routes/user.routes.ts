import { Router } from 'express';

import { createUserController } from '../modules/users/useCases/createUser';
import { deleteUserController } from '../modules/users/useCases/deleteUser';
import { getAllUsersController } from '../modules/users/useCases/getAllUsers';
import { updateUserController } from '../modules/users/useCases/updateUser';

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
