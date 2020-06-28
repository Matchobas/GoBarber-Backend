"use strict";

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderAppointmentsService = _interopRequireDefault(require("./ListProviderAppointmentsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeAppointmentsRepository;
let listProviderAppointmentsService;
describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    listProviderAppointmentsService = new _ListProviderAppointmentsService.default(fakeAppointmentsRepository, fakeCacheProvider);
  });
  it('should be able to list the appointments on a specific day', async () => {
    // O mês é 5, mas os meses do Date começam do 0, então temos que prestar atenção nisso
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'random_provider_id',
      user_id: 'random_user_id',
      date: new Date(2020, 4, 20, 14, 0, 0)
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'random_provider_id',
      user_id: 'random_user_id',
      date: new Date(2020, 4, 20, 15, 0, 0)
    });
    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'random_provider_id',
      year: 2020,
      month: 5,
      day: 20
    });
    expect(appointments).toEqual([appointment1, appointment2]);
  });
});