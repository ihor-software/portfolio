import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppDispatchType, AppStateType } from '..';
import axios from 'axios';
import { Allergy } from 'src/types/allergy.types';

export type AllergiesState = {
  allergies: Allergy[];
};

const initialState: AllergiesState = {
  allergies: [],
};

const allergiesSlice = createSlice({
  name: 'allergies',
  initialState,
  reducers: {
    setAllergies(state, action: PayloadAction<Allergy[]>) {
      return { ...state, allergies: action.payload };
    },
  },
});

export const fetchAllAllergies = () => async (dispatch: AppDispatchType) => {
  const allergies = await axios.get('/api/v1/allergies');

  if (allergies.status === 200) {
    dispatch(allergiesSlice.actions.setAllergies(allergies.data));
  }
};

export const getAllAllergies = (state: AppStateType) => {
  return state.allergyReducer.allergies;
};

export const {} = allergiesSlice.actions;

export default allergiesSlice.reducer;
