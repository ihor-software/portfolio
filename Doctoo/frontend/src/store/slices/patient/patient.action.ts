import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppStateType } from 'src/store';
import { createPatient, fetchPatient, updatePatient } from 'src/store/services/patient.service';
import { Patient } from '../auth';

export const setPatient = createAsyncThunk('patient/set', async (patient: Patient) => {
  return patient;
});

export const getPatient = createAsyncThunk('patient/get', async (_, thunkAPI) => {
  const state = <AppStateType>thunkAPI.getState();
  const response = await fetchPatient(state.auth.currentUser?.id);

  return response.data;
});

export const updatePatientThunk = createAsyncThunk(
  'patient/update',
  async (dto: Partial<Patient>, thunkAPI) => {
    const state = <AppStateType>thunkAPI.getState();
    const { data } = await updatePatient(state.auth.currentUser!.id, dto);
    return data;
  },
);

export const createPatientThunk = createAsyncThunk(
  'patient/update',
  async (dto: Partial<Patient>, thunkAPI) => {
    const state = <AppStateType>thunkAPI.getState();
    const { data } = await createPatient(state.auth.currentUser!.id);
    return data;
  },
);
