import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUser,
  logout,
  patchPatientConditions,
  patchUser,
} from 'src/store/services/auth.service';
import { Allergy } from 'src/types/allergy.types';
import { Condition } from 'src/types/condition.types';
import { User } from 'src/types/user.types';
import { AppStateType, store } from 'src/store';
import { setMessage } from '../systemMessage.slice';
import { setPatient } from '../patient';

export const getUserThunk = createAsyncThunk('auth/get-user', async function () {
  const { data } = await getUser();
  return data;
});

export const setUserThunk = createAsyncThunk('auth/set-user', async function (user: User) {
  return user;
});

export const logoutThunk = createAsyncThunk('auth/logout', async function () {
  const { data } = await logout();
  return data;
});

export const patchUserThunk = createAsyncThunk(
  'auth/patch',
  async (updatedUser: Partial<User>, thunkAPI) => {
    const state = <AppStateType>thunkAPI.getState();
    const data = {};
    const response = await patchUser(state.auth.currentUser?.id, updatedUser);

    if (response.status === 200) {
      thunkAPI.dispatch(setMessage({ message: 'User was successully updated', status: 'success' }));
    } else {
      thunkAPI.dispatch(
        setMessage({
          message: 'An error occured while updating user information. Please, try again later.',
          status: 'success',
        }),
      );
    }

    thunkAPI.dispatch(setUserThunk(response.data));
    return data;
  },
);

export const patchPatientConditionsThunk = createAsyncThunk(
  'auth/patchPatientConditions',
  async (updatedData: { allergies: Allergy['id'][]; conditions: Condition['id'][] }, thunkAPI) => {
    const state = <AppStateType>thunkAPI.getState();
    const response = await patchPatientConditions(state.auth.currentUser?.id, updatedData);
    if (response.status === 200) {
      thunkAPI.dispatch(setPatient(response.data));
      thunkAPI.dispatch(
        setMessage({ message: 'Patient conditions were successfully updated!', status: 'success' }),
      );
    } else {
      thunkAPI.dispatch(
        setMessage({
          message: 'An error occured while updating patient conditions. Please, try again later.',
          status: 'error',
        }),
      );
    }
    return response.data;
  },
);
