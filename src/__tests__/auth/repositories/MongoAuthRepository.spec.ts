import { Auth } from '../../../modules/auth/model/Auth';
import { MongoAuthRepository } from '../../../modules/auth/repositories/implementations/MongoAuthRepository';

describe('AuthRepository', () => {
  const authRepository = new MongoAuthRepository();

  it('should be able to login user', async () => {
    const auth = await authRepository.login({
      username: 'Jennie',
      password: 'Jennie123',
    });

    expect(auth).toHaveProperty('accessToken');
    expect(auth.refreshToken).toBeTruthy();
    expect(auth).toBeInstanceOf(Auth);
  });

  it('should be able to get a new access token', async () => {
    const { accessToken } = await authRepository.refresh({
      decoded: {
        username: 'Jennie',
      },
    });

    expect(accessToken).toBeTruthy();
  });
});
