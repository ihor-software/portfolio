import { RegisterOptions } from 'react-hook-form';
import { FindDoctorFormFields } from './FindDoctorForm';

export type ConvertToRegisterOptions<T> = {
  [K in keyof T]: RegisterOptions;
};

export const registerValidation: ConvertToRegisterOptions<FindDoctorFormFields> = {
  doctorOrSymptom: {
    required: 'Enter the doctor name or symptoms of your disease!',
  },
};
