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
    return jwt.sign(payload, token, { ...(options && options) });
  }

  constructor(data: ICreateJwtDTO) {
    this.accessToken = jwt.sign(
      data.accessTokenPayload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15s',
      }
    );
    this.refreshToken = jwt.sign(
      data.refreshTokenPayload,
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '1d',
      }
    );
  }
}

export { Auth };
