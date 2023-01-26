import { Role } from "../../../../models/User";

export interface ICreateUserDTO{
  username: string;
  password: string;
  roles: Role[];
}