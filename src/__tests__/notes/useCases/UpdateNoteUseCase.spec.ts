import { MongoNotesRepository } from '../../../modules/notes/repositories/implementations/MongoNotesRepository';
import { UpdateNoteUseCase } from '../../../modules/notes/useCases/updateNote/UpdateNoteUseCase';
import { MongoUsersRepository } from '../../../modules/users/repositories/implementations/MongoUsersRepository';

describe('UpdateNoteUseCase', () => {
  let updateNoteUseCase: UpdateNoteUseCase;
  let notesRepository: MongoNotesRepository;
  let usersRepository: MongoUsersRepository;

  beforeAll(() => {
    notesRepository = new MongoNotesRepository();
    updateNoteUseCase = new UpdateNoteUseCase(notesRepository);
    usersRepository = new MongoUsersRepository();
  });

  it('should be able to update user', async () => {
    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const note = await notesRepository.create({
      userId: user.id as string,
      title: 'Note title test 12',
      text: 'Note text',
    });

    await updateNoteUseCase.execute({
      id: note.id as string,
      userId: user.id as string,
      isManagerOrAdmin: false,
      text: 'Note text updated',
      title: 'Note title test 123',
      completed: true,
    });

    const notes = await notesRepository.getAll();

    expect(notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          text: 'Note text updated',
          title: 'Note title test 123',
          completed: true,
        }),
      ])
    );
  });
});
