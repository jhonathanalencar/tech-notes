import request from 'supertest';

import { app } from '../..';
import { MongoAuthRepository } from '../../modules/auth/repositories/implementations/MongoAuthRepository';
import { MongoUsersRepository } from '../../modules/users/repositories/implementations/MongoUsersRepository';

const authRepository = new MongoAuthRepository();

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
