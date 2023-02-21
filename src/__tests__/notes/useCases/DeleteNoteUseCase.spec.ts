import { MongoNotesRepository } from '../../../modules/notes/repositories/implementations/MongoNotesRepository';
import { DeleteNoteUseCase } from '../../../modules/notes/useCases/deleteNote/DeleteNoteUseCase';
import { MongoUsersRepository } from '../../../modules/users/repositories/implementations/MongoUsersRepository';

describe('DeleteNoteUseCase', () => {
  let deleteNoteUseCase: DeleteNoteUseCase;
  let notesRepository: MongoNotesRepository;
  let usersRepository: MongoUsersRepository;

  beforeAll(() => {
    notesRepository = new MongoNotesRepository();
    deleteNoteUseCase = new DeleteNoteUseCase(notesRepository);
    usersRepository = new MongoUsersRepository();
  });

  it('should be able to delete note', async () => {
    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const note = await notesRepository.create({
      userId: user.id as string,
      title: 'note ABC',
      text: 'note text',
    });

    await deleteNoteUseCase.execute({
      id: note.id as string,
    });

    const notes = await notesRepository.getAll();

    expect(notes).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'note ABC',
        }),
      ])
    );
  });
});
