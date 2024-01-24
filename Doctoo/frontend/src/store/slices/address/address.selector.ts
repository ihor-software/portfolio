import { AppStateType } from 'src/store';

export const selectAddresses = (state: AppStateType) => state.address.data;
export const selectEditingAddress = (state: AppStateType) =>
  state.address.data?.find(address => address.id === state.address.editingId);
