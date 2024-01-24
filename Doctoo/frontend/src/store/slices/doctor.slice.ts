import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Doctor, castToDoctor } from 'src/types/doctor.types';
import { AppDispatchType, AppStateType } from '..';
import axios from 'axios';

export type DoctorsState = {
  selectedDoctor?: Doctor;
  doctors: Doctor[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  isSearching: boolean;
};

const initialState: DoctorsState = {
  doctors: [],
  page: 1,
  hasMore: true,
  loading: false,
  isSearching: false,
};

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    setDoctors(state, action: PayloadAction<Doctor[]>) {
      return { ...state, doctors: action.payload };
    },
    setSelectedDoctor(state, action: PayloadAction<Doctor | undefined>) {
      return { ...state, selectedDoctor: action.payload };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMoreDoctors.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMoreDoctors.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.length === 0) {
          state.hasMore = false;
        } else {
          state.doctors = [...state.doctors, ...action.payload];
        }
      })
      .addCase(fetchMoreDoctors.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchDoctors.pending, state => {
        state.loading = true;
        state.isSearching = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.length === 0 && !state.isSearching) {
          state.hasMore = false;
        } else {
          state.doctors = action.payload;
          state.isSearching = false;
        }
      })
      .addCase(fetchDoctors.rejected, state => {
        state.loading = false;
      });
  },
});

export const fetchMoreDoctors = createAsyncThunk(
  'doctors/fetchMoreDoctors',
  async ({
    keyword,
    page,
    pageSize,
    specialty,
    hospital,
  }: {
    keyword: string;
    page: number;
    pageSize: number;
    specialty?: string;
    hospital?: string;
  }) => {
    const response = await axios.get(
      `/api/v1/doctors/search?keyword=${keyword}&page=${page}&pageSize=${pageSize}&specialty=${specialty}&hospital=${hospital}`,
    );
    let doctors = await response.data;

    doctors = await Promise.all(doctors.map(async (doctor: any) => await castToDoctor(doctor)));

    return doctors;
  },
);

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async ({
    keyword,
    page,
    pageSize,
    specialty,
    hospital,
  }: {
    keyword: string;
    page: number;
    pageSize: number;
    specialty: string;
    hospital: string;
  }) => {
    const response = await axios.get(
      `/api/v1/doctors/search?keyword=${keyword}&page=${page}&pageSize=${pageSize}&specialty=${specialty}&hospital=${hospital}`,
    );
    let doctors = await response.data;

    doctors = await Promise.all(doctors.map(async (doctor: any) => await castToDoctor(doctor)));

    return doctors;
  },
);

export const fetchAllDoctors = () => async (dispatch: AppDispatchType) => {
  const response = await fetch(`/api/v1/doctors`, {
    method: 'GET',
  });

  let doctors = await response.json();

  doctors = await Promise.all(doctors.map(async (doctor: any) => await castToDoctor(doctor)));

  dispatch(doctorsSlice.actions.setDoctors(doctors));
};

export const fetchDoctorById = (id: number) => async (dispatch: AppDispatchType) => {
  const response = await fetch(`/api/v1/doctors/${id}`, {
    method: 'GET',
  });

  let doctor = await response.json();

  if (doctor) {
    doctor = await castToDoctor(doctor);
  }

  dispatch(doctorsSlice.actions.setSelectedDoctor(doctor));
};

export const getAllDoctors = (state: AppStateType) => {
  return state.doctorsReducer.doctors;
};

export const getSelectedDoctor = (state: AppStateType) => {
  return state.doctorsReducer.selectedDoctor;
};

export const getDoctorAppointments = (id: number) => (state: AppStateType) => {
  return state.appointmentReducer.appointments.filter(
    appointment => appointment.doctor?.user_id === id,
  );
};

export const {} = doctorsSlice.actions;

export const selectDoctors = (state: { doctors: any }) => state.doctors;
export const selectLoading = (state: { loading: any }) => state.loading;
export const selectHasMore = (state: { hasMore: any }) => state.hasMore;

export default doctorsSlice.reducer;
