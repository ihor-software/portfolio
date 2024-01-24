import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppDispatchType, AppStateType } from '..';
import axios from 'axios';
import { MedicalCondition } from 'src/types/medical-conditions.types';

export type MedicalConditionsState = {
  medicalConditions: MedicalCondition[];
};

const initialState: MedicalConditionsState = {
  medicalConditions: [],
};

const medicalConditionsSlice = createSlice({
  name: 'medicalConditions',
  initialState,
  reducers: {
    setMedicalConditions(state, action: PayloadAction<MedicalCondition[]>) {
      return { ...state, medicalConditions: action.payload };
    },
  },
});

export const fetchAllMedicalConditions = () => async (dispatch: AppDispatchType) => {
  const medicalConditions = await axios.get('/api/v1/medical-conditions');

  if (medicalConditions.status === 200) {
    dispatch(medicalConditionsSlice.actions.setMedicalConditions(medicalConditions.data));
  }
};

export const getAllMedicalConditions = (state: AppStateType) => {
  return state.medicalConditionReducer.medicalConditions;
};

export const {} = medicalConditionsSlice.actions;

export default medicalConditionsSlice.reducer;
