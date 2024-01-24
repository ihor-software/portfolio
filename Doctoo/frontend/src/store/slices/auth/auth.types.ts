import { Allergy } from 'src/types/allergy.types';
import { Doctor } from 'src/types/doctor.types';
import { Condition } from 'src/types/condition.types';

export type Patient = {
  user_id: number;
  height?: number;
  weight?: number;
  bloodtype?: string;
  family_doctor_id?: number;
  declaration_number?: string;
  medicalConditions?: Condition[];
  allergies?: Allergy[];
  createdAt: Date;
  updatedAt: Date;
  familyDoctor?: Doctor;
};
