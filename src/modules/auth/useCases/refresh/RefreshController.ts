import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { IRefreshTokenPayload } from '../../repositories/IAuthRepository';
import { RefreshUseCase } from './RefreshUseCase';

class RefreshController {
  constructor(private refreshUseCase: RefreshUseCase) {}

  async handle(request: Request, response: Response): Promise<Response | void> {
    const cookies = request.cookies;

    if (!cookies?.jwt) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    const refreshToken = cookies.jwt as string;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (error, decoded) => {
        if (error) {
          return response.status(403).json({ error: 'Forbidden' });
        }

        const accessToken = await this.refreshUseCase.execute({
          decoded: decoded as IRefreshTokenPayload,
        });

        return response.status(200).json({ accessToken });
      }
    );
  }
}

export { RefreshController };
