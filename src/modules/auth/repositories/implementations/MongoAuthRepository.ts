import bcrypt from 'bcrypt';

import { UnauthenticatedError } from '../../../../errors';
import { UserModel } from '../../../../models/User';
import { Auth } from '../../model/Auth';
import { IAuthRepository, ILoginDTO } from '../IAuthRepository';

class MongoAuthRepository implements IAuthRepository {
  async login(data: ILoginDTO): Promise<Auth> {
    const user = await UserModel.findOne({ username: data.username })
      .lean()
      .exec();

    if (!user || !user.active) {
      throw new UnauthenticatedError('Unauthorized');
    }

    const matchPassword = bcrypt.compare(data.password, user.password);

    if (!matchPassword) {
      throw new UnauthenticatedError('Unauthorized');
    }

    const accessTokenPayload = {
      userInfo: {
        username: user.username,
        roles: user.roles,
      },
    };

    const refreshTokenPayload = {
      username: user.username,
    };

    const auth = new Auth({
      accessTokenPayload,
      refreshTokenPayload,
    });

    return auth;
  }
  refresh: () => void;
  logout: () => void;
}

export { MongoAuthRepository };
