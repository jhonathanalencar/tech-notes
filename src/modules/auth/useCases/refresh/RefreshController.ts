import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthenticatedError, UnauthorizedError } from '../../../../errors';
import { IRefreshTokenPayload } from '../../repositories/IAuthRepository';

import { RefreshUseCase } from './RefreshUseCase';

class RefreshController {
  constructor(private refreshUseCase: RefreshUseCase) {}

  async handle(request: Request, response: Response): Promise<Response | void> {
    const cookies = request.cookies;

    if (!cookies?.jwt) {
      throw new UnauthenticatedError('Unauthorized');
    }

    const refreshToken = cookies.jwt as string;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (error, decoded) => {
        if (error) {
          throw new UnauthorizedError('Forbidden');
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
