import jwt from 'jsonwebtoken';

import { ICreateJwtDTO } from '../repositories/IAuthRepository';

class Auth {
  accessToken: string;
  refreshToken: string;

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
