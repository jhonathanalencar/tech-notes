import bcrypt from 'bcrypt';

import { UnauthenticatedError } from '../../../../errors';
import { UserModel } from '../../../../models/User';
import { Auth } from '../../model/Auth';
import { IAuthRepository, ILoginDTO, IRefreshDTO } from '../IAuthRepository';

class MongoAuthRepository implements IAuthRepository {
  async login(data: ILoginDTO): Promise<Auth> {
    const user = await UserModel.findOne({ username: data.username })
      .lean()
      .exec();

    if (!user || !user.active) {
      throw new UnauthenticatedError('Unauthorized');
    }

    const matchPassword = await bcrypt.compare(data.password, user.password);

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

  async refresh(data: IRefreshDTO): Promise<Pick<Auth, 'accessToken'>> {
    const user = await UserModel.findOne({ username: data.decoded.username })
      .lean()
      .exec();

    if (!user) {
      throw new UnauthenticatedError('Unauthorized');
    }

    const accessTokenPayload = {
      userInfo: {
        username: user.username,
        roles: user.roles,
      },
    };

    const accessToken = Auth.createJwt(
      accessTokenPayload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    return { accessToken };
  }
}

export { MongoAuthRepository };
