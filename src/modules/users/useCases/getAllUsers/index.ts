import { MongoUsersRepository } from "../../repositories/implementations/MongoUsersRepository";
import { GetAllUsersController } from "./GetAllUsersController";
import { GetAllUsersUseCase } from "./GetAllUsersUseCase";

const usersRepository = new MongoUsersRepository();
const getAllUsersUseCase = new GetAllUsersUseCase(usersRepository);
const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);

export { getAllUsersController }