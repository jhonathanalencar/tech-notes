import { MongoNotesRepository } from '../../../modules/notes/repositories/implementations/MongoNotesRepository';
import { CreateNoteUseCase } from '../../../modules/notes/useCases/createNote/CreateNoteUseCase';
import { MongoUsersRepository } from '../../../modules/users/repositories/implementations/MongoUsersRepository';

describe('CreateNoteUseCase', () => {
  let createNoteUseCase: CreateNoteUseCase;
  let notesRepository: MongoNotesRepository;
  let usersRepository: MongoUsersRepository;

  beforeAll(() => {
    notesRepository = new MongoNotesRepository();
    createNoteUseCase = new CreateNoteUseCase(notesRepository);
    usersRepository = new MongoUsersRepository();
  });

  it('should be able to create new notes', async () => {
    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    await createNoteUseCase.execute({
      userId: user.id as string,
      title: 'Note title test',
      text: 'Note text',
    });

    const notes = await notesRepository.getAll();

    expect(notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Note title test',
        }),
      ])
    );
  });
});
