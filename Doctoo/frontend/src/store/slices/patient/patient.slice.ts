import { createSlice } from '@reduxjs/toolkit';
import { Patient } from '../auth';
import { getPatient, setPatient, updatePatientThunk } from './patient.action';

const ERROR_MESSAGE = 'Something went wrong. Try again later.';

export interface PatientState {
  data: Patient | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PatientState = {
  data: null,
  isLoading: false,
  error: null,
};

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setPatient.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.data = payload;
    });
    builder.addCase(setPatient.rejected, state => {
      state.isLoading = false;
      state.error = null;
      state.data = null;
    });
    builder.addCase(getPatient.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.data = payload;
    });
    builder.addCase(getPatient.rejected, state => {
      state.isLoading = false;
      state.error = ERROR_MESSAGE;
    });
    builder.addCase(getPatient.pending, state => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(updatePatientThunk.fulfilled, (state, { payload }) => {
      state.data = { ...state, ...payload };
    });
  },
});

// Actions
export const {} = patientSlice.actions;

export default patientSlice.reducer;
