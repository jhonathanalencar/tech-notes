import { MongoAuthRepository } from '../../repositories/implementations/MongoAuthRepository';
import { LoginController } from './LoginController';
import { LoginUseCase } from './LoginUseCase';

const authRepository = new MongoAuthRepository();
const loginUseCase = new LoginUseCase(authRepository);
const loginController = new LoginController(loginUseCase);

export { loginController };
