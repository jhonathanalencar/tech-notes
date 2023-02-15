import request from 'supertest';

import { app } from '../..';
import { MongoAuthRepository } from '../../modules/auth/repositories/implementations/MongoAuthRepository';

describe('[POST] /users', () => {
  const authRepository = new MongoAuthRepository();

  it('should be able to create new users', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Alice',
      password: 'Alice123',
    });

    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        username: 'Anna',
        password: 'Anna123',
        roles: ['Employee'],
      })
      .expect(201);

    expect(response.body).toMatchObject({
      message: 'New user Anna created',
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
        username: 'Anna',
        password: 'Anna123',
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
