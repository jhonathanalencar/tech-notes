import request from 'supertest';

import { app } from '../..';
import { Auth } from '../../modules/auth/model/Auth';

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

describe('[GET] /auth/refresh', () => {
  it('should be able to get a new access token', async () => {
    const refreshToken = Auth.createJwt(
      { username: 'Jennie' },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '15s' }
    );

    const response = await request(app)
      .get('/auth/refresh')
      .set('Cookie', [`jwt=${refreshToken}`])
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
  });

  it('should not be able to get a new access token when refresh token is already expired', async () => {
    const refreshToken = Auth.createJwt(
      { username: 'Jennie' },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '0s' }
    );

    const response = await request(app)
      .get('/auth/refresh')
      .set('Cookie', [`jwt=${refreshToken}`])
      .expect(403);

    expect(response.body).toMatchObject({
      error: 'Forbidden',
    });
  });

  it('should not be able to get a new access token whithout a refresh token', async () => {
    const response = await request(app).get('/auth/refresh').expect(401);

    expect(response.body).toMatchObject({
      error: 'Unauthorized',
    });
  });
});

describe('[POST] /auth/logout', () => {
  it('should be able to logout user', async () => {
    const refreshToken = Auth.createJwt(
      { username: 'Jennie' },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '15s' }
    );

    const response = await request(app)
      .post('/auth/logout')
      .set('Cookie', [`jwt=${refreshToken}`])
      .expect(200);

    expect(response.body).toMatchObject({
      message: 'Cookie cleared',
    });
  });

  it('should be able to logout user without refresh token', async () => {
    await request(app).post('/auth/logout').expect(204);
  });
});
