import { CreationAttributes } from 'sequelize';
import { CreatePatientDto, UpdatePatientDto } from 'src/patient/dto';
import { Patient } from 'src/patient/entities';

export const initialPatient = {
  updatedAt: '2023-08-21T11:58:43.657Z',
  createdAt: '2023-08-21T11:58:43.657Z',
  height: null,
  weight: null,
  bloodtype: null,
  family_doctor_id: null,
  declaration_number: null,
  medicalConditions: [],
  allergies: [],
};

export const mockedPatients = [
  {
    user_id: 1,
    ...initialPatient,
  },
];

export const createPatientDto = {
  user_id: 1,
};

export const existingUserPatientId = 1;

export const updatePatientDto = {
  height: 176.5,
  weight: 63.5,
  bloodtype: 'AB+',
  declaration_number: '13124135',
};

export const updatedPatient = {
  user_id: existingUserPatientId,
  ...updatePatientDto,
};

export const patientMockService = {
  create: jest.fn((dto: CreatePatientDto) => {
    return {
      ...dto,
      ...initialPatient,
    };
  }),
  findAll: jest.fn(() => mockedPatients),
  findOne: jest.fn((user_id: number) => {
    return user_id === existingUserPatientId ? mockedPatients[0] : 'Not Found';
  }),
  update: jest.fn((user_id: number, dto: UpdatePatientDto) => {
    if (user_id === existingUserPatientId) {
      return { user_id, ...dto };
    } else {
      return 'Not Found';
    }
  }),
  remove: jest.fn((user_id: number) => {
    return user_id === existingUserPatientId ? null : 'Not Found';
  }),
};

export const patientMockRepo = {
  create: jest.fn((values: CreationAttributes<Patient>) =>
    Promise.resolve({
      ...values,
      ...initialPatient,
    }),
  ),
  findAll: jest.fn(() => Promise.resolve(mockedPatients)),
  findByPk: jest.fn((identifier: number) =>
    Promise.resolve(mockedPatients.find(patient => patient.user_id === identifier)),
  ),
  destroy: jest.fn(() => Promise.resolve(null)),
  update: jest.fn(
    (values: Partial<Patient>, options: { where: { user_id: number }; returning: boolean }) =>
      Promise.resolve([1, [{ ...values, user_id: options.where.user_id }]]),
  ),
};
