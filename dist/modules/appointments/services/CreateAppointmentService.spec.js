"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeNotificationsRepository;
let fakeAppointmentsRepository;
let createAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    createAppointmentService = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheProvider);
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: 'provider_id',
      user_id: 'user_id'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
  });
  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 10).getTime();
    });
    const appointmentDate = new Date(2020, 4, 11, 12);
    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: 'provider_id',
      user_id: 'user_id'
    });
    await expect(createAppointmentService.execute({
      date: appointmentDate,
      provider_id: 'provider_id',
      user_id: 'user_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment on a passed date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 10, 11),
      provider_id: 'provider_id',
      user_id: 'user_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: 'user_id',
      user_id: 'user_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 11, 7),
      provider_id: 'provider_id',
      user_id: 'user_id'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 11, 18),
      provider_id: 'provider_id',
      user_id: 'user_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});