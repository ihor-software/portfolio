import { User } from 'src/types/user.types';
import { Doctor, DoctorHospital, DoctorSpecialty } from 'src/types/doctor.types';
import { getRandomNumberInRange } from './math-utils';
import { Patient } from 'src/types/patient.types';
import { Appointment, AppointmentStatus } from 'src/types/appointment.types';

export const getRandomMockUser = (): User => users[getRandomNumberInRange(0, users.length - 1)];

export const getRandomMockSpecialty = (): DoctorSpecialty =>
  specialties[getRandomNumberInRange(0, specialties.length - 1)];

export const getRandomMockHospital = (): DoctorHospital =>
  hospitals[getRandomNumberInRange(0, hospitals.length - 1)];

export const getRandomMockDoctor = (): Doctor =>
  doctors[getRandomNumberInRange(0, doctors.length - 1)];

export const getRandomMockPatient = (): Patient =>
  patients[getRandomNumberInRange(0, patients.length - 1)];

export const getRandomMockAppointment = (): Appointment =>
  appointments[getRandomNumberInRange(0, appointments.length - 1)];

export const getMockUsers = (): User[] => users;
export const getMockSpecialties = (): DoctorSpecialty[] => specialties;
export const getMockHospitals = (): DoctorHospital[] => hospitals;
export const getMockDoctors = (): Doctor[] => doctors;
export const getMockPatients = (): Patient[] => patients;
export const getMockAppointments = (): Appointment[] => appointments;

const users: User[] = [
  {
    id: 1,
    first_name: 'Leislie',
    last_name: 'Alexander',
    email: 'leislie.alexander@mail.com',
    phone_number: '+380948540314',
    role_cd: 'doctor',
    gender_cd: 'male',
    is_confirmed: true,
    avatar: '',
  },
  {
    id: 2,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@mail.com',
    phone_number: '+380512561617',
    role_cd: 'patient',
    gender_cd: 'male',
    is_confirmed: true,
    avatar: '',
  },
  {
    id: 3,
    first_name: 'Helen',
    last_name: 'Eichmann',
    email: 'helen.eichmann@mail.com',
    phone_number: '+380968410643',
    role_cd: 'doctor',
    gender_cd: 'female',
    is_confirmed: true,
    avatar: '',
  },
  {
    id: 4,
    first_name: 'Joan',
    last_name: 'Hernandes',
    email: 'joan.hernandes@mail.com',
    phone_number: '+380957195815',
    role_cd: 'doctor',
    gender_cd: 'male',
    is_confirmed: true,
    avatar: '',
  },
  {
    id: 5,
    first_name: 'Samantha',
    last_name: 'Smith',
    email: 'samantha.smith@mail.com',
    phone_number: '+380581769158',
    role_cd: 'patient',
    gender_cd: 'female',
    is_confirmed: true,
    avatar: '',
  },
];

const hospitals: DoctorHospital[] = [
  { hospital_id: 1, name: 'General Hospital' },
  { hospital_id: 2, name: 'City Medical Center' },
  { hospital_id: 3, name: 'Central Health Clinic' },
  { hospital_id: 4, name: 'Community Hospital' },
  { hospital_id: 5, name: 'Regional Medical Center' },
  { hospital_id: 6, name: 'University Hospital' },
  { hospital_id: 7, name: "Children's Medical Center" },
  { hospital_id: 8, name: 'Veterans Memorial Hospital' },
  { hospital_id: 9, name: "Saint Mary's Hospital" },
  { hospital_id: 10, name: 'Sunrise Medical Center' },
  { hospital_id: 11, name: 'Grace Healthcare Hospital' },
  { hospital_id: 12, name: 'Harborview Medical Center' },
  { hospital_id: 13, name: 'Green Valley Community Hospital' },
  { hospital_id: 14, name: 'Mercy Hospital' },
  { hospital_id: 15, name: 'Hillside Medical Center' },
  { hospital_id: 16, name: 'Hope General Hospital' },
  { hospital_id: 17, name: 'Pineview Hospital' },
  { hospital_id: 18, name: 'Maplewood Regional Clinic' },
  { hospital_id: 19, name: 'Oceanfront Health Center' },
  { hospital_id: 20, name: 'Sunnybrook Medical Facility' },
  { hospital_id: 21, name: 'Cedar Grove Hospital' },
  { hospital_id: 22, name: 'Blue Ridge Medical Center' },
  { hospital_id: 23, name: 'Valley View Clinic' },
  { hospital_id: 24, name: 'Golden State Medical Center' },
  { hospital_id: 25, name: 'Trinity Hospital' },
  { hospital_id: 26, name: 'Westside Wellness Clinic' },
  { hospital_id: 27, name: 'Northwind Health Services' },
  { hospital_id: 28, name: 'Riverside Community Hospital' },
  { hospital_id: 29, name: 'Meadowview Medical Center' },
  { hospital_id: 30, name: 'Oakwood General Hospital' },
];

const specialties: DoctorSpecialty[] = [
  { specialty_id: 1, specialty: 'Cardiology' },
  { specialty_id: 2, specialty: 'Dermatology' },
  { specialty_id: 3, specialty: 'Endocrinology' },
  { specialty_id: 4, specialty: 'Gastroenterology' },
  { specialty_id: 5, specialty: 'Hematology' },
  { specialty_id: 6, specialty: 'Infectious Diseases' },
  { specialty_id: 7, specialty: 'Neurology' },
  { specialty_id: 8, specialty: 'Obstetrics and Gynecology' },
  { specialty_id: 9, specialty: 'Oncology' },
  { specialty_id: 10, specialty: 'Ophthalmology' },
  { specialty_id: 11, specialty: 'Orthopedics' },
  { specialty_id: 12, specialty: 'Otolaryngology (ENT)' },
  { specialty_id: 13, specialty: 'Pediatrics' },
  { specialty_id: 14, specialty: 'Psychiatry' },
  { specialty_id: 15, specialty: 'Radiology' },
  { specialty_id: 16, specialty: 'Surgery' },
  { specialty_id: 17, specialty: 'Urology' },
  { specialty_id: 18, specialty: 'Nephrology' },
  { specialty_id: 19, specialty: 'Rheumatology' },
  { specialty_id: 20, specialty: 'Allergy and Immunology' },
  { specialty_id: 21, specialty: 'Emergency Medicine' },
  { specialty_id: 22, specialty: 'Family Medicine' },
  { specialty_id: 23, specialty: 'Internal Medicine' },
  { specialty_id: 24, specialty: 'Physical Medicine and Rehabilitation' },
  { specialty_id: 25, specialty: 'Anesthesiology' },
  { specialty_id: 26, specialty: 'Pulmonology' },
];

const doctors: Doctor[] = getMockUsers()
  .filter(user => user.role_cd === 'doctor')
  .map(user => {
    const specialty = getRandomMockSpecialty();
    const hospital = getRandomMockHospital();

    return {
      user_id: user.id,
      specialty_id: specialty.specialty_id,
      hospital_id: hospital.hospital_id,
      specialty: 'specialty',
      hospital: hospital,
      bio: 'It is important to have a doctor who is interested in your long-term health and happiness. My hope is that every person I talk to feels that I am interested in them personally and want to do all that I can to help them feel better now, and provide suggestions for ongoing wellness. My advice to everyone? Laugh at least once a day… humor is truly the best medicine!',
      schedule: '9:00-18:00',
      top_doctor: Boolean(getRandomNumberInRange(0, 1)),
      rating: getRandomNumberInRange(1, 5),
      available: Boolean(getRandomNumberInRange(0, 1)),
      payrate: getRandomNumberInRange(20, 300),
      patients: [],
      appointments: [],
      reviews: [...Array(getRandomNumberInRange(0, 200))],
      user: user,
    } as Doctor;
  });

const patients: Patient[] = getMockUsers()
  .filter(user => user.role_cd === 'patient')
  .map(user => {
    const doctor = getRandomMockDoctor();

    return {
      user_id: user.id,
      height: getRandomNumberInRange(50, 240),
      weight: getRandomNumberInRange(1, 600),
      bloodtype: 'AB+',
      declaration_number: getRandomNumberInRange(10000000, 99999999).toString(),
      medicalConditions: [],
      allergies: [],
      family_doctor_id: doctor.user_id,
      family_doctor: doctor,
    } as Patient;
  });

const appointments: Appointment[] = getMockDoctors().flatMap((doctor, doctorIndex) =>
  [...Array(5)].map((_, index) => {
    const patient = getRandomMockPatient();

    return {
      id: doctorIndex * 5 + index,
      date_time: new Date(getRandomNumberInRange(1516239022, 1716239022)),
      rating: getRandomNumberInRange(0, 5),
      doctor_id: doctor.user_id,
      patient_id: patient.user_id,
      doctor: doctor,
      patient: patient,
      status_cd: [
        AppointmentStatus.CANCELED,
        AppointmentStatus.PLANNED,
        AppointmentStatus.COMPLETED,
      ][getRandomNumberInRange(0, 2)],
      is_paid: Boolean(getRandomNumberInRange(0, 1)),
      is_visited: Boolean(getRandomNumberInRange(0, 1)),
      is_notified_pay: Boolean(getRandomNumberInRange(0, 1)),
      is_notified_time: Boolean(getRandomNumberInRange(0, 1)),
      attached_files: [],
    } as Appointment;
  }),
);
