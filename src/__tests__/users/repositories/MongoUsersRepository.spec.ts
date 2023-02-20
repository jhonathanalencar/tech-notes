import { validate } from 'uuid';
import { IUser } from '../../../models/User';

import { MongoUsersRepository } from '../../../modules/users/repositories/implementations/MongoUsersRepository';

describe('UsersRepository', () => {
  let usersRepository: MongoUsersRepository;

  beforeAll(() => {
    usersRepository = new MongoUsersRepository();
  });

  it('should be able to create new users', async () => {
    const user = await usersRepository.createUser({
      username: 'Jennie Doe',
      password: 'coolpassword',
      roles: ['Employee'],
    });

    expect(JSON.parse(JSON.stringify(user))).toEqual(
      expect.objectContaining({
        username: 'Jennie Doe',
        active: true,
        roles: ['Employee'],
      })
    );
    expect(validate(user.id as string)).toBe(true);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should be able to list all users', async () => {
    const user = await usersRepository.createUser({
      username: 'Viper',
      password: 'Viper',
      roles: ['Employee', 'Manager'],
    });

    const users = await usersRepository.getAllUsers();

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: user.id,
          username: 'Viper',
          roles: ['Employee', 'Manager'],
          active: true,
        }),
      ])
    );
  });

  it('should be able to update user', async () => {
    const user = await usersRepository.createUser({
      username: 'Pedro Dyera',
      password: String(Math.random()),
      roles: ['Employee'],
    });

    await usersRepository.updateUser({
      id: user.id as string,
      username: 'Pedro Dyera updated',
      active: false,
      roles: ['Employee', 'Manager', 'Admin'],
    });

    const users = await usersRepository.getAllUsers();

    const updatedUser = users.some(
      (user) => user.username === 'Pedro Dyera updated'
    );

    expect(updatedUser).toBe(true);
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: user.id,
          username: 'Pedro Dyera updated',
          active: false,
          roles: ['Employee', 'Manager', 'Admin'],
        }),
      ])
    );
  });

  it('should be able to delete user', async () => {
    const user = await usersRepository.createUser({
      username: 'Daniel Kendy',
      password: 'darielken',
      roles: ['Employee'],
    });

    await usersRepository.deleteUser({
      id: user.id as string,
    });

    const users = await usersRepository.getAllUsers();
    const deletedUser = users.some((u) => (u as IUser)._id === user.id);

    expect(deletedUser).toBe(false);
    expect(users).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: user.id,
          username: 'Daniel Kendy',
        }),
      ])
    );
  });
});
