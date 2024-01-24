import axios from 'axios';
import { Country } from 'src/types/country.types';

export const fetchCoutries = async () => {
  return axios.get<Country[]>(`/api/v1/countries`);
};
