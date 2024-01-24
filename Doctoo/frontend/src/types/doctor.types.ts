import { Appointment } from './appointment.types';
import { Patient } from './patient.types';
import { Review } from './review.type';
import { User } from './user.types';
import { RequestMethod, request } from 'src/utils/request-utils';

export type Doctor = {
  user_id: number;
  specialty_id: number;
  hospital_id: number;
  payrate: number;
  available: boolean;
  user: User;
  bio?: string;
  schedule?: string;
  specialty?: string;
  hospital?: DoctorHospital;
  patients: Patient[];
  appointments: Appointment[];
  reviews: Review[];
  top_doctor: boolean;
  rating: number;
};

export type DoctorHospital = {
  hospital_id: number;
  name: string;
};

export type DoctorSpecialty = {
  specialty_id: number;
  specialty: string;
};

export const castToDoctor = async (object?: any): Promise<Doctor | undefined> => {
  const reviews = await request(RequestMethod.GET, `/api/v1/reviews/${object.user_id}`);
  const reviewsData: Review[] = reviews.data.map(
    (item: { rating: number; review_text: string }) => {
      return { text: item.review_text, rating: item.rating, author: '' };
    },
  );
  const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviewsData.length;
  if (object) {
    return {
      user_id: object.user_id ?? 0,
      specialty_id: object.specialty_id ?? 0,
      hospital_id: object.hospital_id ?? 0,
      payrate: object.payrate ?? 0,
      available: object.available ?? false,
      user: {
        id: object.user_id,
        first_name: object.user?.first_name,
        last_name: object.user?.last_name,
        avatar: object.user?.avatar,
      },
      bio: object.bio,
      schedule: object.schedule ?? '9:00-18:00',
      specialty: object.specialty.specialty,
      hospital: {
        hospital_id: object.hospital.hospital_id,
        name: object.hospital.name,
      },
      patients: [],
      appointments: [],
      reviews: reviewsData,
      top_doctor: false,
      rating: averageRating,
    };
  }
};
