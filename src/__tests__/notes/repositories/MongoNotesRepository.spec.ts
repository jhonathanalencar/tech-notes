import { validate } from 'uuid';
import { MongoNotesRepository } from '../../../modules/notes/repositories/implementations/MongoNotesRepository';
import { MongoUsersRepository } from '../../../modules/users/repositories/implementations/MongoUsersRepository';

describe('NotesRepository', () => {
  let usersRepository: MongoUsersRepository;
  let notesRepository: MongoNotesRepository;

  beforeAll(() => {
    usersRepository = new MongoUsersRepository();
    notesRepository = new MongoNotesRepository();
  });

  it('should be able to create new notes', async () => {
    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const note = await notesRepository.create({
      userId: user.id as string,
      title: 'note title 1',
      text: 'note text 1',
    });

    expect(note).toEqual(
      expect.objectContaining({
        title: 'note title 1',
        text: 'note text 1',
        completed: false,
      })
    );
    expect(validate(note.id as string)).toBe(true);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should be able to list all notes', async () => {
    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const note = await notesRepository.create({
      userId: user.id as string,
      title: 'note title 2',
      text: 'note text 2',
    });

    const notes = await notesRepository.getAll();

    expect(notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: note.id,
          title: 'note title 2',
          text: 'note text 2',
        }),
      ])
    );
  });

  it('should be able to update note', async () => {
    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const note = await notesRepository.create({
      userId: user.id as string,
      title: 'note title 3',
      text: 'note text 3',
    });

    await notesRepository.update({
      id: note.id as string,
      userId: user.id as string,
      text: note.text,
      isManagerOrAdmin: false,
      title: 'note title 3 updated',
      completed: true,
    });

    const notes = await notesRepository.getAll();

    expect(notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'note title 3 updated',
          text: 'note text 3',
          completed: true,
        }),
      ])
    );
  });

  it('should be able to delete note', async () => {
    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const note = await notesRepository.create({
      userId: user.id as string,
      title: 'note title 4',
      text: 'note text 4',
    });

    await notesRepository.delete({
      id: note.id as string,
    });

    const notes = await notesRepository.getAll();

    expect(notes).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'note title 4',
          text: 'note text 4',
        }),
      ])
    );
  });
});
