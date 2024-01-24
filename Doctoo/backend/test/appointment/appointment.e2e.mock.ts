export const appointments = [
  {
    id: 1,
    date_time: '2016-07-16T19:20:00',
    rating: 4.6,
    doctor_id: 4,
    patient_id: 5,
    status_cd: 'Completed',
    is_notified_time: false,
    is_notified_pay: false,
    is_paid: false,
    is_visited: true,
  },
];

export const testAppointment = {
  date_time: '2016-07-16T19:20:00',
  rating: 4.6,
  doctor_id: 4,
  patient_id: 5,
  status_cd: 'Planned',
  is_notified_time: false,
  is_notified_pay: false,
  is_paid: false,
  is_visited: true,
};

export const invalidAppointment = {
  rating: 4.6,
  doctor_id: 4,
  patient_id: 5,
  status: 'Planned',
};

export const updateAppointmentData = {
  rating: 4,
};

export const updatedAppointment = {
  date_time: '2016-07-16T19:20:00',
  rating: 4.6,
  doctor_id: 4,
  patient_id: 5,
  status_cd: 'Completed',
  is_notified_time: false,
  is_notified_pay: false,
  is_paid: false,
  is_visited: true,
};

export const existingId = 1;
export const nonExistingId = -13213;

export const mockedAppointmentModel = {
  findAll: jest.fn(() => appointments),
  findByPk: jest.fn((id: number) => (id === existingId ? testAppointment : null)),
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
};
