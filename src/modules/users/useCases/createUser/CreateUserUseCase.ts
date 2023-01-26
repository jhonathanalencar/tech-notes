import {
  IUsersRepository,
  ICreateUserDTO,
} from '../../repositories/IUsersRepository';

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserDTO) {
    const user = this.usersRepository.createUser(data);

    return user;
  }
}

export { CreateUserUseCase };
