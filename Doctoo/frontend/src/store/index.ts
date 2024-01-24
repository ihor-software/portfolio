import { systemMessageReducer } from './slices/systemMessage.slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/registerSlice';
import doctorsReducer from './slices/doctor.slice';
import usersReducer from './slices/user.slice';
import notificationReducer from './slices/notificationSlice';
import appointmentReducer from './slices/appointment.slice';
import patientReducer from './slices/patient/patient.slice';
import countriesReducer from './slices/countries/countries.slice';
import addressReducer from './slices/address/address.slice';
import { authReducer } from './slices/auth/auth.slice';
import searchReducer from './slices/searchSlice';
import virtualAssistantReducer from './slices/virtual-assistant.slice';
import medicalConditionReducer from './slices/medical-conditions.slice';
import allergyReducer from './slices/allergies.slice';
import navbarSlice from './slices/navbar/navbar.slice';

const rootReducer = combineReducers({
  registerReducer,
  doctorsReducer,
  usersReducer,
  notificationReducer,
  appointmentReducer,
  searchReducer,
  medicalConditionReducer,
  allergyReducer,
  patient: patientReducer,
  auth: authReducer,
  systemMessage: systemMessageReducer,
  countries: countriesReducer,
  address: addressReducer,
  virtualAssistant: virtualAssistantReducer,
  navbar: navbarSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export const store = setupStore();
export type AppStateType = ReturnType<typeof rootReducer>;
export type AppStoreType = ReturnType<typeof setupStore>;
export type AppDispatchType = AppStoreType['dispatch'];
