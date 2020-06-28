"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeHashProvider;
let fakeUsersRepository;
let updateProfileService;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new _FakeHashProvider.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    updateProfileService = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johdoe@gmail.com',
      password: '123456'
    });
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Boyega',
      email: 'boyega@gmail.com'
    });
    expect(updatedUser.name).toBe('John Boyega');
    expect(updatedUser.email).toBe('boyega@gmail.com');
  });
  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'boyega@gmail.com',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'Benny',
      email: 'teste@gmail.com',
      password: '123456'
    });
    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'Benny',
      email: 'boyega@gmail.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johdoe@gmail.com',
      password: '123456'
    });
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Boyega',
      email: 'boyega@gmail.com',
      old_password: '123456',
      password: '123123'
    });
    expect(updatedUser.password).toBe('123123');
  });
  it('should not be able to update password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johdoe@gmail.com',
      password: '123456'
    });
    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Boyega',
      email: 'boyega@gmail.com',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johdoe@gmail.com',
      password: '123456'
    });
    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Boyega',
      email: 'boyega@gmail.com',
      old_password: 'wrong_old_password',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update profile of a non-existing user', async () => {
    await expect(updateProfileService.execute({
      user_id: 'non-existing-user',
      name: 'John Boyega',
      email: 'boyega@gmail.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});