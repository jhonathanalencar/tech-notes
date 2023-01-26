import {
  IUsersRepository,
  IUpdateUserDTO,
} from '../../repositories/IUsersRepository';

class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IUpdateUserDTO) {
    await this.usersRepository.updateUser(data);
  }
}

export { UpdateUserUseCase };
