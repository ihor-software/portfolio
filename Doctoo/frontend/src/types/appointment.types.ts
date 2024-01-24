import { RequestMethod, request } from 'src/utils/request-utils';
import { Doctor, castToDoctor } from './doctor.types';
import { Patient, castToPatient } from './patient.types';
import { Review } from './review.type';

export enum AppointmentStatus {
  PLANNED = 'Planned',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}

export type Appointment = {
  id: number;
  date_time: Date;
  rating: number;
  doctor_id: number;
  patient_id: number;
  status_cd: AppointmentStatus;
  is_visited: boolean;
  is_paid: boolean;
  is_notified_time: boolean;
  is_notified_pay: boolean;
  doctor?: Doctor;
  patient?: Patient;
  summary?: string;
  attached_files: { type: string; link: string }[];
};

export const castToAppointment = async (object?: any): Promise<Appointment | undefined> => {
  let doctor, patient;

  if (object.doctor_id) {
    const fetchDoctorResponse = await request(
      RequestMethod.GET,
      `/api/v1/doctors/${object.doctor_id}`,
    );

    if (fetchDoctorResponse.status === 200 && fetchDoctorResponse.data) {
      doctor = await castToDoctor(fetchDoctorResponse.data);
      object.doctor = doctor;
    }
  }

  if (object.patient_id) {
    const fetchPatientResponse = await request(
      RequestMethod.GET,
      `/api/v1/patients/${object.patient_id}`,
    );

    if (fetchPatientResponse.status === 200 && fetchPatientResponse.data) {
      patient = await castToPatient(fetchPatientResponse.data);
      object.patient = patient;
    }
  }

  if (object) {
    const reviews = await request(RequestMethod.GET, `/api/v1/reviews/${object.doctor.user_id}`);
    const reviewsData: Review[] = reviews.data.map(
      (item: { rating: number; review_text: string }) => {
        return { text: item.review_text, rating: item.rating, author: '' };
      },
    );
    const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviewsData.length;

    const attachedFiles = object.attached_files ?? [];
    if (object.summary && object.summary.trim() !== '') {
      attachedFiles.push({ type: 'Summary', link: object.summary });
    }

    return {
      id: object.id ?? 0,
      date_time: new Date(object.date_time) ?? new Date(0),
      rating: object.rating ?? 0,
      doctor_id: object.doctor_id ?? 0,
      patient_id: object.patient_id ?? 0,
      status_cd: object.status_cd ?? AppointmentStatus.PLANNED,
      is_visited: object.is_visited ?? false,
      is_paid: object.is_paid ?? false,
      is_notified_time: object.is_notified_time ?? false,
      is_notified_pay: object.is_notified_pay ?? false,
      summary: object.summary ?? '',
      doctor: {
        user_id: object.doctor.user_id,
        specialty_id: object.doctor.specialty_id,
        hospital_id: object.doctor.hospital_id,
        payrate: object.doctor.payrate,
        available: object.doctor.available,
        user: {
          id: object.doctor.user_id,
          first_name: object.doctor.user.first_name,
          last_name: object.doctor.user.last_name,
          avatar: object.doctor.user.avatar,
        },
        bio: object.doctor.bio,
        schedule: '9:00-18:00',
        specialty: object.doctor.specialty.specialty || object.doctor.specialty,
        hospital: {
          name: object.doctor.hospital.name,
          hospital_id: object.doctor.hospital_id,
        },
        patients: [],
        appointments: [],
        reviews: reviewsData,
        top_doctor: true,
        rating: averageRating,
      },
      patient: {
        user: {
          id: object.patient.user_id,
          first_name: object.patient.user.first_name,
          last_name: object.patient.user.last_name,
          avatar: object.patient.user.avatar,
        },
        user_id: object.patient.user_id,
        medicalConditions: [],
        allergies: [],
        family_doctor: {
          user_id: object.patient.family_doctor.user_id,
          specialty_id: object.patient.family_doctor.specialty_id,
          hospital_id: object.patient.family_doctor.hospital_id,
          payrate: object.patient.family_doctor.payrate,
          available: object.patient.family_doctor.available,
          user: {
            id: object.patient.family_doctor.user_id,
            first_name: object.patient.family_doctor.user.first_name,
            last_name: object.patient.family_doctor.user.last_name,
            avatar: object.patient.family_doctor.user.avatar,
          },
          bio: object.patient.family_doctor.bio,
          schedule: '9:00-18:00',
          specialty: object.patient.family_doctor.specialty.specialty,
          hospital: object.patient.family_doctor.hospital.name,
          patients: [],
          appointments: [],
          reviews: [],
          top_doctor: true,
          rating: object.patient.family_doctor.rating,
        },
      },
      attached_files: attachedFiles,
    };
  }
};
