import { createSlice } from '@reduxjs/toolkit';

type NavbarStateType = {
  isShown: boolean;
};

const initialState: NavbarStateType = {
  isShown: true,
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    openNavbar(state) {
      state.isShown = true;
    },
    closeNavbar(state) {
      state.isShown = false;
    },
  },
});

export const { openNavbar, closeNavbar } = navbarSlice.actions;

export default navbarSlice.reducer;
