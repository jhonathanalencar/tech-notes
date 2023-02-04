import { MongoAuthRepository } from '../../repositories/implementations/MongoAuthRepository';
import { RefreshController } from './RefreshController';
import { RefreshUseCase } from './RefreshUseCase';

const authRepository = new MongoAuthRepository();
const refreshUseCase = new RefreshUseCase(authRepository);
const refreshController = new RefreshController(refreshUseCase);

export { refreshController };
