import { User } from '../../model/User';

import { IUsersRepository } from '../../repositories/IUsersRepository';

class GetAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(): Promise<User[]> {
    const users = this.usersRepository.getAllUsers();

    return users;
  }
}

export { GetAllUsersUseCase };
