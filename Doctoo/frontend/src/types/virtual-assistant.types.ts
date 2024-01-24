import { Doctor } from './doctor.types';
import { Appointment } from './appointment.types';

export type MessageType = {
  id?: number;
  user_id?: number;
  role: 'user' | 'assistant' | 'system';
  message: string;
  isVisible?: boolean;
  available_doctors?: Doctor[];
  containsDoctorsList?: boolean;
  nearest_appointments?: Appointment[];
  containsAppointmentsList?: boolean;
};
