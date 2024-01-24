import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCoutries } from 'src/store/services/countries.service';

export const getCountries = createAsyncThunk('countries/get', async () => {
  const { data } = await fetchCoutries();
  return data;
});
