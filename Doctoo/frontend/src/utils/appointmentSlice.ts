import { Appointment } from 'src/types/appointment.types';
import { Doctor } from 'src/types/doctor.types';

export function getUniqueDoctors(appointments: Appointment[]): Doctor[] {
  const uniqueDoctorIds = new Set<number>();
  const uniqueDoctors: Doctor[] = [];

  for (const appointment of appointments) {
    if (appointment.doctor?.user_id && !uniqueDoctorIds.has(appointment.doctor.user_id)) {
      uniqueDoctorIds.add(appointment.doctor.user_id);
      uniqueDoctors.push(appointment.doctor);
    }
  }
  return uniqueDoctors;
}
