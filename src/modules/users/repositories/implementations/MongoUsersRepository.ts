import bcrypt from 'bcrypt';

import { ConflictError } from '../../../../errors/ConflictError';
import { NotFoundError } from '../../../../errors/NotFoundError';
import { UserModel } from '../../../../models/User';
import { User } from '../../model/User';
import {
  ICreateUserDTO,
  IUsersRepository,
  IUpdateUserDTO,
} from '../IUsersRepository';

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

  async updateUser(data: IUpdateUserDTO): Promise<void> {
    const user = await UserModel.findById(data.id).exec();

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const duplicate = await UserModel.findOne({ username: data.username })
      .collation({ locale: 'en', strength: 2 })
      .lean()
      .exec();

    if (duplicate && duplicate._id !== user._id) {
      throw new ConflictError('Duplicate username');
    }

    user.username = data.username;
    user.roles = data.roles;
    user.active = data.active;

    if (data.password) {
      user.password = await bcrypt.hash(data.password, 10);
    }

    await user.save();
  }

  deleteUser(): void {
    throw new Error('Method not implemented.');
  }
}

export { MongoUsersRepository };
