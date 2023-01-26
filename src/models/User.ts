import mongoose from "mongoose";

type Role = 'Employee' | 'Admin' | 'Manager';

interface IUser{
  _id: string;
  username: string;
  password: string;
  roles: Role[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  _id: {
    type: String,
    required: true,
  },
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
}, {
  timestamps: true,
  _id: false,
  id: false,
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export { UserModel, IUser, Role, userSchema }