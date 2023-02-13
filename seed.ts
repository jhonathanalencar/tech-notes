import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'node:path';

import { NoteModel } from './src/models/Note';
import { IUser, UserModel } from './src/models/User';
import { MongoNotesRepository } from './src/modules/notes/repositories/implementations/MongoNotesRepository';
import { MongoUsersRepository } from './src/modules/users/repositories/implementations/MongoUsersRepository';

config({
  path: path.resolve(__dirname, '.env.test'),
});

async function seedDB() {
  const usersRepository = new MongoUsersRepository();
  const notesRepository = new MongoNotesRepository();

  const userOne = await usersRepository.createUser({
    username: 'Jennie',
    password: 'Jennie123',
    roles: ['Employee'],
  });

  await usersRepository.createUser({
    username: 'Anna',
    password: 'Anna123',
    roles: ['Employee', 'Manager', 'Admin'],
  });

  await notesRepository.create({
    title: 'New note title',
    text: 'New note text',
    userId: (userOne as IUser)._id,
  });
}

async function clearDB() {
  await NoteModel.deleteMany();
  await UserModel.deleteMany();
}

export async function main() {
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.DATABASE_URI);
  await clearDB();
  await seedDB();
  await mongoose.connection.close();
}

main();
