import { CreateDoctorDto } from 'src/doctor';

export const testDoctorInput: CreateDoctorDto = {
  user_id: 1,
  specialty_id: 0,
  payrate: 100,
  available: true,
  hospital_id: 1,
};

export const ids = { valid: 1, invalid: -2 };

export const mockedDoctorService = {
  create: jest.fn(doctorDto => doctorDto),
  findAll: jest.fn(() => [testDoctorInput]),
  findOne: jest.fn((id: number) => (id === ids.valid ? testDoctorInput : null)),
  findByPk: jest.fn((id: number) => (id === ids.valid ? testDoctorInput : null)),
  update: jest.fn().mockImplementation((updatedto, options) => {
    if (options.where.user_id === ids.valid) {
      return Promise.resolve([1, [updatedto]]);
    } else {
      return Promise.resolve([0, []]);
    }
  }),
  destroy: jest.fn().mockImplementation(options => {
    if (options.where.user_id === ids.valid) {
      return Promise.resolve(1);
    } else {
      return Promise.resolve(0);
    }
  }),
  remove: jest.fn(),
};
