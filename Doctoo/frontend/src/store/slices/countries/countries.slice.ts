import { createSlice } from '@reduxjs/toolkit';
import { Country } from 'src/types/country.types';
import { getCountries } from './countries.action';

const ERROR_MESSAGE = 'Something went wrong. Try again later.';

export interface CountriesState {
  data: Country[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CountriesState = {
  data: [],
  isLoading: false,
  error: null,
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCountries.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.data = payload;
    });
    builder.addCase(getCountries.rejected, state => {
      state.isLoading = false;
      state.error = ERROR_MESSAGE;
    });
    builder.addCase(getCountries.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
  },
});

export default countriesSlice.reducer;
