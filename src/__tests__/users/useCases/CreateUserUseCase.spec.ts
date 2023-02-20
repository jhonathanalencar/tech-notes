import { MongoUsersRepository } from '../../../modules/users/repositories/implementations/MongoUsersRepository';
import { CreateUserUseCase } from '../../../modules/users/useCases/createUser/CreateUserUseCase';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let usersRepository: MongoUsersRepository;

  beforeAll(() => {
    usersRepository = new MongoUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to create new users', async () => {
    await createUserUseCase.execute({
      username: 'Kate',
      password: String(Math.random()),
      roles: ['Employee'],
    });

    const users = await usersRepository.getAllUsers();

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          username: 'Kate',
        }),
      ])
    );
  });
});
