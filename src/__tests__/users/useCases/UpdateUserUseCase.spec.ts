import { MongoUsersRepository } from '../../../modules/users/repositories/implementations/MongoUsersRepository';
import { UpdateUserUseCase } from '../../../modules/users/useCases/updateUser/UpdateUserUseCase';

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase;
  let usersRepository: MongoUsersRepository;

  beforeAll(() => {
    usersRepository = new MongoUsersRepository();
    updateUserUseCase = new UpdateUserUseCase(usersRepository);
  });

  it('should be able to update user', async () => {
    const user = await usersRepository.createUser({
      username: 'Emilly',
      password: String(Math.random()),
      roles: ['Employee'],
    });

    await updateUserUseCase.execute({
      ...user,
      id: user.id as string,
      username: 'Emilly updated',
      roles: ['Employee', 'Manager'],
    });

    const users = await usersRepository.getAllUsers();

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          username: 'Emilly updated',
          roles: ['Employee', 'Manager'],
        }),
      ])
    );
  });
});
