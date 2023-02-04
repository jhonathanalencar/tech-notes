import {
  IAuthRepository,
  IRefreshDTO,
} from '../../repositories/IAuthRepository';

class RefreshUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(data: IRefreshDTO) {
    const { accessToken } = await this.authRepository.refresh(data);

    return accessToken;
  }
}

export { RefreshUseCase };
