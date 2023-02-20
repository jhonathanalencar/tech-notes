import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import { app } from '../..';
import { IUser } from '../../models/User';
import { MongoAuthRepository } from '../../modules/auth/repositories/implementations/MongoAuthRepository';
import { MongoNotesRepository } from '../../modules/notes/repositories/implementations/MongoNotesRepository';
import { MongoUsersRepository } from '../../modules/users/repositories/implementations/MongoUsersRepository';

const authRepository = new MongoAuthRepository();
const usersRepository = new MongoUsersRepository();

describe('[POST] /users', () => {
  it('should be able to create new users', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Alice',
      password: 'Alice123',
    });

    const username = String(Math.random());

    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        username,
        password: String(Math.random()),
        roles: ['Employee'],
      })
      .expect(201);

    expect(response.body).toMatchObject({
      message: `New user ${username} created`,
    });
  });

  it('should not be able to create new users when username is already taken', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Alice',
      password: 'Alice123',
    });

    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        username: 'Jennie',
        password: 'jennie123',
        roles: ['Employee'],
      })
      .expect(409);

    expect(response.body).toMatchObject({
      error: 'Duplicate username',
    });
  });

  it('should not be able to a non manager or admin user create new users', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Jennie',
      password: 'Jennie123',
    });
    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        username: 'Dave',
        password: 'Dave123',
        roles: ['Employee'],
      })
      .expect(401);

    expect(response.body).toMatchObject({
      error: 'Unauthorized',
    });
  });
});

describe('[GET] /users', () => {
  const usersRepository = new MongoUsersRepository();

  it('should be able to list all users', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Alice',
      password: 'Alice123',
    });

    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          username: user.username,
        }),
      ])
    );
  });

  it('should not be able to a non manager or admin user get list of all users', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Jennie',
      password: 'Jennie123',
    });

    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);

    expect(response.body).toMatchObject({
      error: 'Unauthorized',
    });
  });
});

describe('[PATCH] /users', () => {
  it('should be able to update user', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Alice',
      password: 'Alice123',
    });

    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    await request(app)
      .patch('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: user.id,
        username: 'username updated',
        roles: ['Employee', 'Manager'],
        active: true,
      })
      .expect(204);

    const users = await usersRepository.getAllUsers();

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: user.id,
          username: 'username updated',
          roles: ['Employee', 'Manager'],
          active: true,
        }),
      ])
    );
  });

  it('should not be able to update a non existing user', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Alice',
      password: 'Alice123',
    });

    const response = await request(app)
      .patch('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: uuidv4(),
        username: String(Math.random()),
        roles: ['Employee'],
        active: true,
      })
      .expect(404);

    expect(response.body).toMatchObject({
      error: 'User not found',
    });
  });

  it('should not be able to update user when username is already taken', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Alice',
      password: 'Alice123',
    });

    const user1 = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const user2 = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const response = await request(app)
      .patch('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: (user1 as IUser)._id,
        username: user2.username,
        roles: ['Employee'],
        active: true,
      })
      .expect(409);

    expect(response.body).toMatchObject({
      error: 'Duplicate username',
    });
  });

  it('should not be able to a non manager or admin user update a user', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Jennie',
      password: 'Jennie123',
    });

    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const response = await request(app)
      .patch('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: user.id,
        username: String(Math.random()),
        roles: ['Employee'],
        active: true,
      })
      .expect(401);

    expect(response.body).toMatchObject({
      error: 'Unauthorized',
    });
  });
});

describe('[DELETE] /users', () => {
  it('should be able to delete user', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Alice',
      password: 'Alice123',
    });

    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    await request(app)
      .delete('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ id: user.id })
      .expect(204);

    const users = await usersRepository.getAllUsers();

    const deletedUser = users.some((u) => (u as IUser)._id === user.id);

    expect(deletedUser).toBe(false);
  });

  it('should not be able to delete a non existing user', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Alice',
      password: 'Alice123',
    });

    const response = await request(app)
      .delete('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ id: uuidv4() })
      .expect(404);

    expect(response.body).toMatchObject({
      error: 'User not found',
    });
  });

  it('should not be able to delete a user with assigned notes', async () => {
    const notesRepository = new MongoNotesRepository();

    const { accessToken } = await authRepository.login({
      username: 'Alice',
      password: 'Alice123',
    });

    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    await notesRepository.create({
      title: String(Math.random()),
      text: String(Math.random()),
      userId: user.id as string,
    });

    const response = await request(app)
      .delete('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: user.id,
      })
      .expect(400);

    expect(response.body).toMatchObject({
      error: 'User has assigned notes',
    });
  });

  it('should not be able to a non manager or admin user delete a user', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Jennie',
      password: 'Jennie123',
    });

    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const response = await request(app)
      .delete('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: user.id,
      })
      .expect(401);

    expect(response.body).toMatchObject({
      error: 'Unauthorized',
    });
  });
});
