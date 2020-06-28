"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UpdateUserAvatarService = _interopRequireDefault(require("./UpdateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeStorageProvider;
let fakeUsersRepository;
let updateUserAvatarService;
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeStorageProvider = new _FakeStorageProvider.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    updateUserAvatarService = new _UpdateUserAvatarService.default(fakeUsersRepository, fakeStorageProvider);
  });
  it('should be able update the avatar ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johdoe@gmail.com',
      password: '123456'
    });
    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    });
    expect(user.avatar).toBe('avatar.jpg');
  });
  it('should not be able to update avatar from non existing user', async () => {
    await expect(updateUserAvatarService.execute({
      user_id: 'non-existing-user',
      avatarFilename: 'avatar.jpg'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johdoe@gmail.com',
      password: '123456'
    });
    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    });
    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
  });
});