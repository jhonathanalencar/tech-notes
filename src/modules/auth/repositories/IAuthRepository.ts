import { Role } from '../../../models/User';
import { Auth } from '../model/Auth';

interface ILoginDTO {
  username: string;
  password: string;
}

interface IAccessTokenPayload {
  userInfo: {
    username: string;
    roles: Role[];
  };
}

interface IRefreshTokenPayload {
  username: string;
}

interface ICreateJwtDTO {
  accessTokenPayload: IAccessTokenPayload;
  refreshTokenPayload: IRefreshTokenPayload;
}

interface IAuthRepository {
  login(data: ILoginDTO): Promise<Auth>;
  refresh: () => void;
  logout: () => void;
}

export {
  IAuthRepository,
  ILoginDTO,
  IAccessTokenPayload,
  IRefreshTokenPayload,
  ICreateJwtDTO,
};
