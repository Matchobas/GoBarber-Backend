"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeUsersRepository;
let fakeHashProvider;
let createUserService;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createUserService = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johdoe@gmail.com',
      password: '123456'
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with the same email', async () => {
    const fakeEmail = 'johndoe@gmail.com';
    await createUserService.execute({
      name: 'John Doe',
      email: fakeEmail,
      password: '123456'
    });
    await expect(createUserService.execute({
      name: 'John Doe Marlin',
      email: fakeEmail,
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});