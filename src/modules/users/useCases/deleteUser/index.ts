import { MongoUsersRepository } from '../../repositories/implementations/MongoUsersRepository';
import { DeleteUserController } from './DeleteUserController';
import { DeleteUserUseCase } from './DeleteUserUseCase';

const usersRepository = new MongoUsersRepository();
const deleteUserUseCase = new DeleteUserUseCase(usersRepository);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserController };
