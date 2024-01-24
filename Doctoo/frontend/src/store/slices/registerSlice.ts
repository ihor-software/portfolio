import { createSlice } from '@reduxjs/toolkit';

type RegisterStateType = {
  open: boolean;
};

const initialState: RegisterStateType = {
  open: false,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    openModal(state) {
      state.open = true;
    },
    closeModal(state) {
      state.open = false;
    },
  },
});

export const registerSliceActions = registerSlice.actions;

export default registerSlice.reducer;
