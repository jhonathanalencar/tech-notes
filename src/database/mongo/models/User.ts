import mongoose from "mongoose";

type Role = 'Employee' | 'Admin' | 'Manager';

interface IUser{
  username: string;
  password: string;
  roles: Role[];
  active: boolean;
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: ["Employee"]
  },
  active: {
    type: Boolean,
    default: true
  }
});

const User = mongoose.model<IUser>('User', userSchema);

export { User, IUser }