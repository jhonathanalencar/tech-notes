import { validate } from 'uuid';

import { User } from '../../../modules/users/model/User';

describe('User model', () => {
  it('should be able to create a user with all props', () => {
    const user = new User({
      username: String(Math.random()),
      password: String(Math.random()),
      roles: ['Employee'],
    });

    expect(user).toEqual(
      expect.objectContaining({
        ...user,
        active: true,
      })
    );
    expect(validate(user.id as string)).toBe(true);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });
});
