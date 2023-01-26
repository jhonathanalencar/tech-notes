import { Role } from '../../../models/User';
import { User } from '../model/User';

interface ICreateUserDTO {
  username: string;
  password: string;
  roles: Role[];
}

interface IUpdateUserDTO {
  id: string;
  username: string;
  roles: Role[];
  active: boolean;
  password?: string;
}

interface IDeleteUserDTO {
  id: string;
}

interface IUsersRepository {
  getAllUsers(): Promise<User[]>;
  createUser(data: ICreateUserDTO): Promise<User>;
  updateUser(data: IUpdateUserDTO): Promise<void>;
  deleteUser(data: IDeleteUserDTO): Promise<void>;
}

export { IUsersRepository, ICreateUserDTO, IUpdateUserDTO, IDeleteUserDTO };
