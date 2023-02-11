import request from 'supertest';

import { app } from '../..';

describe('[POST] /auth', () => {
  it('should be able to login user', async () => {
    const response = await request(app)
      .post('/auth')
      .send({
        username: 'Jennie',
        password: 'Jennie123',
      })
      .expect(201);

    expect(response.body).toHaveProperty('accessToken');
  });

  it('should not be able to a non existing user login', async () => {
    const response = await request(app)
      .post('/auth')
      .send({
        username: 'JennieDoe',
        password: 'Jeenie123',
      })
      .expect(401);

    expect(response.body).toMatchObject({
      error: 'Unauthorized',
    });
  });

  it('should not be able to an inactive user login', async () => {
    const response = await request(app)
      .post('/auth')
      .send({
        username: 'Siesta',
        password: 'Siesta123',
      })
      .expect(401);

    expect(response.body).toMatchObject({
      error: 'Unauthorized',
    });
  });

  it('Should not be able to a user login when password is invalid', async () => {
    const response = await request(app)
      .post('/auth')
      .send({
        username: 'Jennie',
        password: 'invalid-password',
      })
      .expect(401);

    expect(response.body).toMatchObject({
      error: 'Unauthorized',
    });
  });
});
