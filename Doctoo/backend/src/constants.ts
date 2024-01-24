export const phoneValidationRegex = /^\+\d{12}$/;

export enum Role {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum AppointmentStatus {
  COMPLETED = 'Completed',
  PLANNED = 'Planned',
  CANCELED = 'Canceled',
}

export enum NotificationType {
  MESSAGE = 'message',
  APPOINTMENT = 'appointment',
  PAYMENT = 'payment',
}

export const CREATE_DOCTORS_VIEW_SQL = `CREATE OR REPLACE VIEW public.doctors_view AS
SELECT "Users".first_name,
    "Users".last_name,
    "Users".email,
    "Users".phone_number,
    "Doctor_specialties".specialty,
    "Doctors".payrate,
    "Doctors".available,
    "Hospitals".name AS hospital
   FROM "Doctors"
     JOIN "Users" ON "Doctors".user_id = "Users".id
     JOIN "Doctor_specialties" ON "Doctors".specialty_id = "Doctor_specialties".specialty_id
     JOIN "Hospitals" ON "Doctors".hospital_id = "Hospitals".hospital_id;
;

ALTER TABLE public.doctors_view
    OWNER TO "${process.env.POSTGRES_USER}";`;
