import { AppStateType } from 'src/store';

export const selectCountries = (state: AppStateType) => state.countries.data;
