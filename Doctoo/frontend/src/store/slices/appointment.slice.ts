import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Appointment, castToAppointment } from 'src/types/appointment.types';
import { AppDispatchType, AppStateType } from '..';
import { RequestMethod, request } from 'src/utils/request-utils';

export type AppointmentsState = {
  appointments: Appointment[];
};

const initialState: AppointmentsState = {
  appointments: [],
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments(state, action: PayloadAction<Appointment[]>) {
      return { ...state, appointments: action.payload };
    },
    addAppointment(state, action: PayloadAction<Appointment>) {
      return { ...state, appointments: [...state.appointments, action.payload] };
    },
    updateAppointment(state, action: PayloadAction<Appointment>) {
      return {
        ...state,
        appointments: state.appointments.map(item =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };
    },
  },
});

export const fetchAllAppointments = () => async (dispatch: AppDispatchType) => {
  const appointmentsResponse = await request(RequestMethod.GET, `/api/v1/appointments`);
  const authenticateResponse = await request(RequestMethod.GET, `/api/v1/authentication`);

  let patientId: number;

  if (authenticateResponse.status === 200) {
    patientId = authenticateResponse.data.user.id;
  }

  if (appointmentsResponse.status === 200) {
    let appointments = appointmentsResponse.data;

    appointments = await Promise.all(
      appointments
        .filter((item: any) => item.patient.user_id === patientId)
        .map(async (appointment: any) => await castToAppointment(appointment)),
    );

    appointments.sort(
      (a: Appointment, b: Appointment) => b.date_time.getTime() - a.date_time.getTime(),
    );

    dispatch(appointmentsSlice.actions.setAppointments(appointments));
  }
};

export const getUpcomingAppointments = () => async (dispatch: AppDispatchType) => {
  const appointmentsResponse = await request(RequestMethod.GET, `/api/v1/appointments/upcoming`);
  console.log(appointmentsResponse);

  if (appointmentsResponse.status === 200) {
    let appointments = appointmentsResponse.data;

    appointments = await Promise.all(
      appointments.map(async (appointment: any) => await castToAppointment(appointment)),
    );

    dispatch(appointmentsSlice.actions.setAppointments(appointments));
  }
};

export const createAppointment = (appointment: any) => async (dispatch: AppDispatchType) => {
  const createAppointmentResponse = await request(
    RequestMethod.POST,
    `/api/v1/appointments`,
    {},
    appointment,
  );

  if (createAppointmentResponse.status === 201) {
    const createdAppointment = await castToAppointment(createAppointmentResponse.data);

    if (createdAppointment) {
      dispatch(appointmentsSlice.actions.addAppointment(createdAppointment));
    }
  }
};

export const getAllAppointments = (state: AppStateType) => {
  return state.appointmentReducer.appointments;
};

export const updateAppointment =
  (id: number, appointment: Appointment) => async (dispatch: AppDispatchType) => {
    const requestBody = JSON.stringify({
      date_time: appointment.date_time,
      rating: appointment.rating,
      doctor_id: appointment.doctor?.user_id,
      patient_id: appointment.patient?.user_id,
      status_cd: appointment.status_cd,
      is_notified_time: appointment.is_notified_time,
      is_notified_pay: appointment.is_notified_pay,
    });

    const response = await request(
      RequestMethod.PATCH,
      `/api/v1/appointments/${id}`,
      { 'Content-Type': 'application/json' },
      requestBody,
    );

    if (response.status === 200) {
      let updatedAppointment = response.data;

      if (updatedAppointment) {
        updatedAppointment = await castToAppointment(updatedAppointment);
        dispatch(appointmentsSlice.actions.updateAppointment(updatedAppointment));
      }
    }
  };

export const {} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
