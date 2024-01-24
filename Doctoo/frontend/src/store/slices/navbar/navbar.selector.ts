import { createSelector } from '@reduxjs/toolkit';
import { AppStateType } from 'src/store';

export const selectNavbarState = (state: AppStateType) => state.navbar;

export const selectIsNavbarShown = createSelector(
  [selectNavbarState],
  navbarState => navbarState.isShown,
);
