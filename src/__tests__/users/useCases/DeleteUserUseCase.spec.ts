import { MongoUsersRepository } from '../../../modules/users/repositories/implementations/MongoUsersRepository';
import { DeleteUserUseCase } from '../../../modules/users/useCases/deleteUser/DeleteUserUseCase';

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let usersRepository: MongoUsersRepository;

  beforeAll(() => {
    usersRepository = new MongoUsersRepository();
    deleteUserUseCase = new DeleteUserUseCase(usersRepository);
  });

  it('should be able to delete user', async () => {
    const user = await usersRepository.createUser({
      username: 'Carlos',
      password: String(Math.random()),
      roles: ['Employee'],
    });

    await deleteUserUseCase.execute({
      id: user.id as string,
    });

    const users = await usersRepository.getAllUsers();

    expect(users).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          username: 'Carlos',
        }),
      ])
    );
  });
});
