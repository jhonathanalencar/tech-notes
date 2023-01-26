import { v4 as uuidv4 } from "uuid";

import { Role } from "../../../models/User";

class User {
  id?: string;
  username: string;
  password: string;
  roles: Role[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor({ username, password, roles }: Partial<User>){
    Object.assign(this, {
      username,
      password,
      roles,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if(!this.id){
      this.id = uuidv4();
    }
  }
}

export { User }