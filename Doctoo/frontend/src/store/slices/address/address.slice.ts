import { createSlice } from '@reduxjs/toolkit';
import { Address } from 'src/types/address.types';
import { createAddress, editAddress, getAddresses } from './address.action';

const ERROR_MESSAGE = 'Something went wrong. Try again later.';

export interface AddressState {
  data?: Address[];
  editingId: Address['id'] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  data: undefined,
  editingId: null,
  isLoading: false,
  error: null,
};

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setEditingId: (state, { payload }) => {
      state.editingId = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getAddresses.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.data = payload;
    });
    builder.addCase(getAddresses.rejected, state => {
      state.isLoading = false;
      state.error = ERROR_MESSAGE;
    });
    builder.addCase(getAddresses.pending, state => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(createAddress.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.data?.push(payload);
    });
    builder.addCase(createAddress.rejected, state => {
      state.isLoading = false;
      state.error = ERROR_MESSAGE;
    });
    builder.addCase(createAddress.pending, state => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(editAddress.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.data = state.data?.map(address =>
        address.id === payload.id ? { ...payload } : address,
      );
    });
    builder.addCase(editAddress.rejected, state => {
      state.isLoading = false;
      state.error = ERROR_MESSAGE;
    });
    builder.addCase(editAddress.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
  },
});

//Actions
export const { setEditingId } = addressSlice.actions;

export default addressSlice.reducer;
