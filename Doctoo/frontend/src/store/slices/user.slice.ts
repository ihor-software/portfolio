import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'src/types/user.types';
import { AppDispatchType, AppStateType } from '..';

export type UsersState = {
  selectedUser?: User;
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      return { ...state, users: action.payload };
    },
    setSelectedUser(state, action: PayloadAction<User | undefined>) {
      return { ...state, selectedUser: action.payload };
    },
  },
});

export const fetchAllUsers = () => async (dispatch: AppDispatchType) => {
  const response = await fetch(`/api/v1/users`, {
    method: 'GET',
  });

  const users = await response.json();

  dispatch(usersSlice.actions.setUsers(users));
};

export const fetchUserById = (id: number) => async (dispatch: AppDispatchType) => {
  const response = await fetch(`/api/v1/users/${id}`, {
    method: 'GET',
  });

  const user = await response.json();

  dispatch(usersSlice.actions.setSelectedUser(user));
};

export const getAllUsers = (state: AppStateType) => {
  return state.usersReducer.users;
};

export const getSelectedUser = (state: AppStateType) => {
  return state.usersReducer.selectedUser;
};

export const {} = usersSlice.actions;

export default usersSlice.reducer;
