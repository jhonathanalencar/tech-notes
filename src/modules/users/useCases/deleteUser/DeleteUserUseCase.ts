import {
  IDeleteUserDTO,
  IUsersRepository,
} from '../../repositories/IUsersRepository';

class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}
  async execute(data: IDeleteUserDTO) {
    await this.usersRepository.deleteUser(data);
  }
}

export { DeleteUserUseCase };
