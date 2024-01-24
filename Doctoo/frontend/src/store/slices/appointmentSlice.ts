import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Appointment } from 'src/types/appointment.types';
import { Doctor } from 'src/types/doctor.types';
import { getRandomMockDoctor } from 'src/utils/mock-utils';
import { fetchData } from '../services/fetchDataUtils';

type AppointmentStateType = {
  appointments: Appointment[];
  savedDoctors: Doctor[];
  loading: boolean;
  familyDoctor: Doctor;
};

function formAppointment(
  appointment: any,
  correspondingDoctor: Doctor,
  correspondingUser: any,
  specialty: string,
  reviews: string[],
) {
  return {
    id: appointment.id,
    datetime: new Date(appointment.date_time),
    doctor: formDoctor(correspondingDoctor, correspondingUser, specialty, reviews),
    status: appointment.status,
  };
}

function formDoctor(doctor: any, user: any, specialty: string, reviews: string[]) {
  return {
    user_id: doctor.user_id,
    hospital_id: doctor.hospital.id,
    specialty_id: doctor.specialty.id,
    specialty: doctor.specialty,
    hospital: doctor.hospital,
    top_doctor: false,
    rating: 5,
    available: doctor.available,
    payrate: doctor.payrate,
    user: user,
    reviews: [...Array(148)],
    appointments: [],
    patients: [],
  } as Doctor;
}

function getUniqueDoctors(appointments: Appointment[]): Doctor[] {
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

function getDataForAppointments(
  appointment: any,
  doctorsData: any,
  usersData: any,
  specialtiesData: any,
) {
  const correspondingDoctor = doctorsData.find(
    (doctor: any) => doctor.user_id === appointment.doctor_id,
  );
  const correspondingUser = usersData.find((user: any) => user.id === correspondingDoctor.user_id);
  const correspondingSpecialty = specialtiesData.find(
    (specialty: any) => specialty.specialty_id === correspondingDoctor.specialty_id,
  );
  return formAppointment(
    appointment,
    correspondingDoctor,
    correspondingUser,
    correspondingSpecialty.specialty,
    [],
  );
}

async function createAppointments(id: number): Promise<Appointment[]> {
  const appointmentsData = await fetchData('/api/v1/appointments/patient/' + id);
  const doctorsData = await fetchData('/api/v1/doctors');
  const usersData = await fetchData('/api/v1/users');
  const specialtiesData = await fetchData('/api/v1/specialties/');

  const appointments: Appointment[] = appointmentsData.map((appointment: any) => {
    return getDataForAppointments(appointment, doctorsData, usersData, specialtiesData);
  });

  return appointments.sort((a, b) => a.date_time.getTime() - b.date_time.getTime());
}


async function createDoctorAppointments(id: number): Promise<Appointment[]> {
  const appointmentsData = await fetchData('/api/v1/appointments/doctor/' + id);
  const doctorsData = await fetchData('/api/v1/doctors');
  const usersData = await fetchData('/api/v1/users');
  const specialtiesData = await fetchData('/api/v1/specialties/');

  const appointments: Appointment[] = appointmentsData.map((appointment: any) => {
    return getDataForAppointments(appointment, doctorsData, usersData, specialtiesData);
  });

  return appointments.sort((a, b) => a.date_time.getTime() - b.date_time.getTime());
}

export const fetchAppointment = createAsyncThunk(
  'appointments/fetchAppointments',
  async (id: number) => {
    const appointments = await createAppointments(id);
    return appointments;
  },
);


const fetchDoctorAppointments = createAsyncThunk(
  'appointments/fetchDoctorAppointments',
  async (id: number) => {
    const appointments = await createDoctorAppointments(id);
    return appointments;
  },
);

export const fetchFamilyDoctor = createAsyncThunk('doctor/familyDoctor', async (id: number) => {
  const patientData = await fetchData('/api/v1/patients/' + id);
  const familyDoctor = await fetchData('/api/v1/doctors/' + patientData.family_doctor_id);
  const user = await fetchData(`/api/v1/users/${familyDoctor.user_id}`);
  return {
    user_id: familyDoctor.user_id,
    hospital_id: familyDoctor.hospital.id,
    specialty_id: familyDoctor.specialty.id,
    specialty: familyDoctor.specialty,
    hospital: familyDoctor.hospital,
    top_doctor: false,
    rating: 5,
    available: familyDoctor.available,
    payrate: familyDoctor.payrate,
    user: user,
    reviews: [...Array(148)],
    appointments: [],
    patients: [],
  } as Doctor;
});

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    appointments: [],
    loading: true,
    savedDoctors: [],
    familyDoctor: getRandomMockDoctor(),
  } as AppointmentStateType,
  reducers: {
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments = [...state.appointments, action.payload];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAppointment.fulfilled, (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
      state.savedDoctors = getUniqueDoctors(state.appointments);
    });
    builder.addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
    });
    builder.addCase(fetchFamilyDoctor.fulfilled, (state, action) => {
      state.familyDoctor = action.payload;
    });
  },
});

export const appointmentSliceActions = appointmentSlice.actions;

export const appointmentAsyncActions = {
  fetchAppointment,
  fetchDoctorAppointments,
  fetchFamilyDoctor,
};

export default appointmentSlice.reducer;
