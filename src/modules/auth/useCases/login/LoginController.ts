import { Request, Response } from 'express';

import { loginBody } from './LoginSchema';
import { LoginUseCase } from './LoginUseCase';

class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = loginBody.parse(request.body);

    const { accessToken, refreshToken } = await this.loginUseCase.execute({
      username,
      password,
    });

    response.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return response.status(201).json({ accessToken });
  }
}

export { LoginController };
