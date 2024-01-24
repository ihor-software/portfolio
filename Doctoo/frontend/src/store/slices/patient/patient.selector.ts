import { AppStateType } from 'src/store';

export const selectPatient = (state: AppStateType) => state.patient.data;
