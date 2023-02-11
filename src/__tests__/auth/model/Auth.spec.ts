import { Auth } from '../../../modules/auth/model/Auth';
import {
  IAccessTokenPayload,
  IRefreshTokenPayload,
} from '../../../modules/auth/repositories/IAuthRepository';

describe('Auth model', () => {
  it('should be able to create an access token and refresh token', () => {
    const accessTokenPayload: IAccessTokenPayload = {
      userInfo: {
        username: 'Jennie',
        roles: ['Employee'],
      },
    };
    const refreshTokenPayload: IRefreshTokenPayload = {
      username: 'Jennie',
    };

    const auth = new Auth({
      accessTokenPayload,
      refreshTokenPayload,
    });

    expect(auth.accessToken).toBeTruthy();
    expect(auth.refreshToken).toBeTruthy();
    expect(auth).toBeInstanceOf(Auth);
  });
});
