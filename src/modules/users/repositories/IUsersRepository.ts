import { Role } from '../../../models/User';
import { User } from '../model/User';

interface ICreateUserDTO {
  username: string;
  password: string;
  roles: Role[];
}

interface IUsersRepository {
  getAllUsers(): Promise<User[]>;
  createUser(data: ICreateUserDTO): Promise<User>;
  updateUser(): void;
  deleteUser(): void;
}

export { IUsersRepository, ICreateUserDTO };
