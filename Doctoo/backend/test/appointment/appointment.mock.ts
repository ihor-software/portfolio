export const appointments = [
  {
    id: 1,
    date_time: new Date('2016-07-16T19:20:00'),
    rating: 4.6,
    doctor_id: 4,
    patient_id: 5,
    status_cd: 'Completed',
  },
];

export const existingId = 1;
export const nonExistingId = -13213;

export const testAppointment = {
  date_time: new Date('2016-07-16T19:20:00'),
  rating: 4.6,
  doctor_id: 4,
  patient_id: 5,
  status_cd: 'Planned',
};

export const updateAppointmentData = {
  status_cd: 'Completed',
};

export const updatedAppointment = {
  date_time: new Date('2016-07-16T19:20:00'),
  rating: 4.6,
  doctor_id: 4,
  patient_id: 5,
  status_cd: 'Completed',
};

export const mockedAppointmentService = {
  findAll: jest.fn(() => appointments),
  findOne: jest.fn((id: number) => (id === existingId ? appointments[0] : null)),
  findByPk: jest.fn((id: number) => (id === existingId ? appointments[0] : null)),
  create: jest.fn(appointment => appointment),
  update: jest.fn().mockImplementation((values, options) => {
    if (options.where.id === existingId) {
      return Promise.resolve([1, [updatedAppointment]]);
    } else {
      return Promise.resolve([0, []]);
    }
  }),
  destroy: jest.fn().mockImplementation(options => {
    if (options.where.id === existingId) {
      return Promise.resolve(1);
    } else {
      return Promise.resolve(0);
    }
  }),
  remove: jest.fn(),
};
