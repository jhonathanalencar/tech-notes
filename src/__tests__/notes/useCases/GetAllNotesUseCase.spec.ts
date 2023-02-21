import { MongoNotesRepository } from '../../../modules/notes/repositories/implementations/MongoNotesRepository';
import { GetAllNotesUseCase } from '../../../modules/notes/useCases/getAllNotes/GetAllNotesUseCase';
import { MongoUsersRepository } from '../../../modules/users/repositories/implementations/MongoUsersRepository';

describe('GetAllNotesUseCase', () => {
  let getAllNotesUseCase: GetAllNotesUseCase;
  let notesRepository: MongoNotesRepository;
  let usersRepository: MongoUsersRepository;

  beforeAll(() => {
    notesRepository = new MongoNotesRepository();
    getAllNotesUseCase = new GetAllNotesUseCase(notesRepository);
    usersRepository = new MongoUsersRepository();
  });

  it('should be able to list all notes', async () => {
    const user = await usersRepository.createUser({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const note1 = await notesRepository.create({
      userId: user.id as string,
      title: 'Note title test A',
      text: 'Note text A',
    });

    const note2 = await notesRepository.create({
      userId: user.id as string,
      title: 'Note title test B',
      text: 'Note text B',
    });

    const notes = await getAllNotesUseCase.execute();

    expect(notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: note1.id,
          title: 'Note title test A',
          text: 'Note text A',
        }),
        expect.objectContaining({
          _id: note2.id,
          title: 'Note title test B',
          text: 'Note text B',
        }),
      ])
    );
  });
});
