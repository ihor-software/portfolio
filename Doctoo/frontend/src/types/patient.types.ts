import { Doctor, castToDoctor } from 'src/types/doctor.types';
import { User, castToUser } from './user.types';
import { RequestMethod, request } from 'src/utils/request-utils';

export type Patient = {
  user_id: number;
  height?: number;
  weight?: number;
  bloodtype?: string;
  family_doctor_id?: number;
  declaration_number?: string;
  user?: User;
  family_doctor?: Doctor;
  medicalConditions: MedicalCondition[];
  allergies: Allergy[];
};

export type MedicalCondition = {
  name: string;
};

export type Allergy = {
  name: string;
};

export const castToPatient = async (object?: any): Promise<Patient | undefined> => {
  let familyDoctor, user;

  if (object.family_doctor_id) {
    const fetchDoctorResponse = await request(
      RequestMethod.GET,
      `/api/v1/doctors/${object.family_doctor_id}`,
    );

    if (fetchDoctorResponse.status === 200 && fetchDoctorResponse.data) {
      familyDoctor = await castToDoctor(fetchDoctorResponse.data);
    }
  }

  if (object.user_id) {
    const fetchUserResponse = await request(RequestMethod.GET, `/api/v1/users/${object.user_id}`);

    if (fetchUserResponse.status === 200 && fetchUserResponse.data) {
      user = await castToUser(fetchUserResponse.data);
    }
  }

  if (object) {
    return {
      user_id: object.user_id ?? 0,
      height: object.height,
      weight: object.weight,
      bloodtype: object.bloodtype,
      family_doctor_id: object.family_doctor_id,
      declaration_number: object.declaration_number,
      user: user,
      family_doctor: familyDoctor,
      medicalConditions: object.medicalConditions ?? [],
      allergies: object.allergies ?? [],
    };
  }
};
