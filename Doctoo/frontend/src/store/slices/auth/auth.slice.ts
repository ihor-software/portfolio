import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'src/types/user.types';
import { Draft } from 'immer';

import {
  getUserThunk,
  logoutThunk,
  patchPatientConditionsThunk,
  patchUserThunk,
  setUserThunk,
} from './auth.thunk';
import { AppStateType } from 'src/store';
import { UserSettings } from '../../../types/user.types';

const ERROR_MESSAGE = 'Something went wrong. Try again later.';

interface CurrentUser {
  user: User;
  userSettings?: UserSettings;
}

interface AuthState {
  currentUser: null | User;
  error: string | null;
  isLoading: boolean;
  userSettings: null | UserSettings;
  isAuth: boolean;
}

const authSlice = createSlice<
  AuthState,
  {
    setCurrentUser: (state: AuthState, action: PayloadAction<CurrentUser>) => void;
  }
>({
  name: 'auth',
  initialState: {
    currentUser: null,
    error: null,
    isLoading: false,
    userSettings: null,
    isAuth: false,
  },
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload?.user;
      if (action.payload.userSettings) {
        state.userSettings = action.payload?.userSettings;
      }
      state.isAuth = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(setUserThunk.fulfilled, (state, { payload }) => {
      state.currentUser = payload;
    });

    builder.addCase(setUserThunk.rejected, state => {
      state.currentUser = null;
    });

    builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.currentUser = payload.user;
      state.userSettings = payload.settings;
      state.isAuth = true;
    });

    builder.addCase(getUserThunk.rejected, state => {
      state.currentUser = null;
      state.isAuth = false;
    });

    builder.addCase(logoutThunk.fulfilled, state => {
      state.currentUser = null;
      state.isAuth = false;
    });

    // --------------------------------------------------------------
    builder.addCase(patchUserThunk.fulfilled, (state, { payload }) => {
      // state.currentUser = payload;
      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(patchUserThunk.rejected, state => {
      state.error = ERROR_MESSAGE;
      state.isLoading = false;
    });

    builder.addCase(patchUserThunk.pending, state => {
      state.error = null;
      state.isLoading = true;
    });

    // --------------------------------------------------------------
    builder.addCase(patchPatientConditionsThunk.fulfilled, (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      if (state.currentUser) {
        state.currentUser.patient = payload as Draft<User['patient']>;
      }
    });

    builder.addCase(patchPatientConditionsThunk.rejected, state => {
      state.error = ERROR_MESSAGE;
      state.isLoading = false;
    });

    builder.addCase(patchPatientConditionsThunk.pending, state => {
      state.error = null;
      state.isLoading = true;
    });
  },
});

export const authReducer = authSlice.reducer;

export const { setCurrentUser } = authSlice.actions;

export const getUser = (state: AppStateType) => state.auth.currentUser;
export const getUserSetting = (state: AppStateType) => state.auth.userSettings;
export const getIsAuth = (state: AppStateType) => state.auth.isAuth;
