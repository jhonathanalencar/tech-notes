import bcrypt from 'bcrypt';

import { ConflictError } from '../../../../errors/ConflictError';
import { UserModel } from '../../../../models/User';
import { User } from '../../model/User';
import { ICreateUserDTO, IUsersRepository } from '../IUsersRepository';

class MongoUsersRepository implements IUsersRepository {
  async getAllUsers(): Promise<User[]> {
    const users = await UserModel.find().select('-password').lean();
    return users;
  }

  async createUser(data: ICreateUserDTO): Promise<User> {
    const { id, ...newUser } = new User(data);

    const duplicate = await UserModel.findOne({ username: data.username })
      .collation({ locale: 'en', strength: 2 })
      .lean()
      .exec();

    if (duplicate) {
      throw new ConflictError('Duplicate username');
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const user = await UserModel.create({
      ...newUser,
      _id: id,
      password: hashedPassword,
    });

    return user;
  }

  updateUser(): void {
    throw new Error('Method not implemented.');
  }
  deleteUser(): void {
    throw new Error('Method not implemented.');
  }
}

export { MongoUsersRepository };
