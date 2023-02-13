import { MongoAuthRepository } from '../../../modules/auth/repositories/implementations/MongoAuthRepository';
import { RefreshUseCase } from '../../../modules/auth/useCases/refresh/RefreshUseCase';

describe('RefreshUseCase', () => {
  let refreshUseCase: RefreshUseCase;
  let authRepository: MongoAuthRepository;

  beforeAll(() => {
    authRepository = new MongoAuthRepository();
    refreshUseCase = new RefreshUseCase(authRepository);
  });

  it('it should be able to get a new access token', async () => {
    const accessToken = await refreshUseCase.execute({
      decoded: {
        username: 'Jennie',
      },
    });

    expect(accessToken).toBeTruthy();
  });
});
