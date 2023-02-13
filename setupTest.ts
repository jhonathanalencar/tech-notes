import { config } from 'dotenv';
import mongoose from 'mongoose';
import path from 'node:path';

config({
  path: path.resolve(__dirname, '.env.test'),
});

beforeAll(async () => {
  mongoose.set('strictQuery', false);

  await mongoose.connect(process.env.DATABASE_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});
