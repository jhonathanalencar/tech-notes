import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import { app } from '../..';
import { MongoAuthRepository } from '../../modules/auth/repositories/implementations/MongoAuthRepository';
import { MongoNotesRepository } from '../../modules/notes/repositories/implementations/MongoNotesRepository';
import { MongoUsersRepository } from '../../modules/users/repositories/implementations/MongoUsersRepository';

const authRepository = new MongoAuthRepository();
const usersRepository = new MongoUsersRepository();
const notesRepository = new MongoNotesRepository();

describe('[POST] /notes', () => {
  it('should be able to create new notes', async () => {
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
      .post('/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        userId: user.id,
        title: 'Note1',
        text: 'texto',
      })
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        userId: user.id,
        title: 'Note1',
        text: 'texto',
        completed: false,
      })
    );
  });

  it('should not be able to create new notes when title is already taken', async () => {
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
      .post('/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        userId: user.id,
        title: 'Note1',
        text: 'texto',
      })
      .expect(409);

    expect(response.body).toMatchObject({
      error: 'Duplicate note title',
    });
  });

  it('should not be able to assign notes to inactive users', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Alice',
      password: 'Alice123',
    });

    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    await usersRepository.updateUser({
      id: user.id as string,
      username: user.username,
      password: user.password,
      roles: user.roles,
      active: false,
    });

    const response = await request(app)
      .post('/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        userId: user.id,
        title: 'Note2',
        text: 'texto',
      })
      .expect(400);

    expect(response.body).toMatchObject({
      error: 'Cannot assign notes to inactive users',
    });
  });

  it('should not be able to assign notes to a non existing user', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Alice',
      password: 'Alice123',
    });

    const response = await request(app)
      .post('/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        userId: uuidv4(),
        title: 'Note3',
        text: 'texto',
      })
      .expect(404);

    expect(response.body).toMatchObject({
      error: 'User not found',
    });
  });
});

describe('[GET] /notes', () => {
  it('should be able to list all notes', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Alice',
      password: 'Alice123',
    });

    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const note1 = await notesRepository.create({
      userId: user.id as string,
      title: 'Note1 title',
      text: 'Note1 text',
    });

    const note2 = await notesRepository.create({
      userId: user.id as string,
      title: 'Note2 title',
      text: 'Note2 text',
    });

    const response = await request(app)
      .get('/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: note1.id,
          title: 'Note1 title',
          text: 'Note1 text',
        }),
        expect.objectContaining({
          _id: note2.id,
          title: 'Note2 title',
          text: 'Note2 text',
        }),
      ])
    );
  });
});

describe('[PUT] /notes', () => {
  it('should be able to update note', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Alice',
      password: 'Alice123',
    });

    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const note = await notesRepository.create({
      userId: user.id as string,
      title: 'note4',
      text: 'text',
    });

    await request(app)
      .put('/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: note.id,
        userId: user.id,
        title: 'title updated',
        text: 'text updated',
        completed: true,
      })
      .expect(204);

    const notes = await notesRepository.getAll();

    expect(notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'title updated',
          text: 'text updated',
          completed: true,
        }),
      ])
    );
  });

  it('should not be able to update a non existing note', async () => {
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
      .put('/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: uuidv4(),
        userId: user.id,
        title: String(Math.random()),
        text: String(Math.random()),
        completed: true,
      })
      .expect(404);

    expect(response.body).toMatchObject({
      error: 'Note not found',
    });
  });

  it('should not be able to update note when title is already taken', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Alice',
      password: 'Alice123',
    });

    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const note1 = await notesRepository.create({
      userId: user.id as string,
      title: 'note A',
      text: 'text',
    });

    const note2 = await notesRepository.create({
      userId: user.id as string,
      title: 'note B',
      text: 'text',
    });

    const response = await request(app)
      .put('/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: note2.id,
        userId: user.id,
        title: note1.title,
        text: String(Math.random()),
        completed: true,
      })
      .expect(409);

    expect(response.body).toMatchObject({
      error: 'Duplicate note title',
    });
  });

  it('should not be able to a non manager or admin user update a note', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Jennie',
      password: 'Jennie123',
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

    const note = await notesRepository.create({
      userId: user2.id as string,
      title: 'Note5',
      text: 'text',
    });

    const response = await request(app)
      .put('/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: note.id,
        userId: user1.id,
        title: String(Math.random()),
        text: String(Math.random()),
        completed: false,
      })
      .expect(401);

    expect(response.body).toMatchObject({
      error: 'Unauthorized',
    });
  });

  it('should be able to a non manager or admin user update their assigned notes', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Jennie',
      password: 'Jennie123',
    });

    const user1 = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const note = await notesRepository.create({
      userId: user1.id as string,
      title: 'Note6',
      text: 'text',
    });

    await request(app)
      .put('/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: note.id,
        userId: user1.id,
        title: String(Math.random()),
        text: String(Math.random()),
        completed: false,
      })
      .expect(204);
  });

  it('should not be able to assign updated note to a non existing user', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Alice',
      password: 'Alice123',
    });

    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const note = await notesRepository.create({
      userId: user.id as string,
      title: 'Note7',
      text: 'text',
    });

    const response = await request(app)
      .put('/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: note.id,
        userId: uuidv4(),
        title: String(Math.random()),
        text: String(Math.random()),
        completed: false,
      })
      .expect(404);

    expect(response.body).toMatchObject({
      error: 'User not found',
    });
  });

  it('Should not be able to assign updated note to a inactive user', async () => {
    const { accessToken } = await authRepository.login({
      username: 'Alice',
      password: 'Alice123',
    });

    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const note = await notesRepository.create({
      userId: user.id as string,
      title: 'Note8',
      text: 'text',
    });

    await usersRepository.updateUser({
      id: user.id as string,
      username: user.username,
      roles: user.roles,
      active: false,
    });

    const response = await request(app)
      .put('/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: note.id,
        userId: user.id,
        title: String(Math.random()),
        text: String(Math.random()),
        completed: false,
      })
      .expect(400);

    expect(response.body).toMatchObject({
      error: 'Cannot assign notes to inactive users',
    });
  });
});
