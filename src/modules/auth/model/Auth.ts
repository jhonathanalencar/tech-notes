import jwt from 'jsonwebtoken';

import { ICreateJwtDTO } from '../repositories/IAuthRepository';

class Auth {
  accessToken: string;
  refreshToken: string;

  static createJwt(
    payload: object,
    token: jwt.Secret,
    options?: jwt.SignOptions
  ) {
    return jwt.sign(payload, token ?? 'secret', { ...(options && options) });
  }

  constructor(data: ICreateJwtDTO) {
    this.accessToken = Auth.createJwt(
      data.accessTokenPayload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15m',
      }
    );
    this.refreshToken = Auth.createJwt(
      data.refreshTokenPayload,
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    );
  }
}

export { Auth };
