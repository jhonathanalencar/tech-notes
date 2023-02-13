import { MongoAuthRepository } from '../../../modules/auth/repositories/implementations/MongoAuthRepository';
import { LoginUseCase } from '../../../modules/auth/useCases/login/LoginUseCase';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let authRepository: MongoAuthRepository;

  beforeAll(() => {
    authRepository = new MongoAuthRepository();
    loginUseCase = new LoginUseCase(authRepository);
  });

  it('should be able to login user', async () => {
    const auth = await loginUseCase.execute({
      username: 'Jennie',
      password: 'Jennie123',
    });

    expect(auth).toHaveProperty('accessToken');
    expect(auth).toHaveProperty('refreshToken');
  });
});
