import { Auth } from '../../model/Auth';
import { IAuthRepository, ILoginDTO } from '../../repositories/IAuthRepository';

class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: ILoginDTO): Promise<Auth> {
    const auth = await this.authRepository.login(data);

    return auth;
  }
}

export { LoginUseCase };
