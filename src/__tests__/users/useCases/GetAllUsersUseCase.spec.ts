import { MongoUsersRepository } from '../../../modules/users/repositories/implementations/MongoUsersRepository';
import { GetAllUsersUseCase } from '../../../modules/users/useCases/getAllUsers/GetAllUsersUseCase';

describe('GetAllUsersUseCase', () => {
  let getAllUsersUseCase: GetAllUsersUseCase;
  let usersRepository: MongoUsersRepository;

  beforeAll(() => {
    usersRepository = new MongoUsersRepository();
    getAllUsersUseCase = new GetAllUsersUseCase(usersRepository);
  });

  it('should be able to list all users', async () => {
    await usersRepository.createUser({
      username: 'Violet',
      password: String(Math.random()),
      roles: ['Employee'],
    });
    await usersRepository.createUser({
      username: 'Maria',
      password: String(Math.random()),
      roles: ['Employee', 'Manager'],
    });

    const users = await getAllUsersUseCase.execute();

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          username: 'Violet',
          roles: ['Employee'],
        }),
        expect.objectContaining({
          username: 'Maria',
          roles: ['Employee', 'Manager'],
        }),
      ])
    );
  });
});
