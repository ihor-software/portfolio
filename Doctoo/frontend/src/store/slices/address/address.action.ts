import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppStateType } from 'src/store';
import { fetchAddresses, patchAddress, postAddress } from 'src/store/services/address.service';
import { Address } from 'src/types/address.types';
import { setMessage } from '../systemMessage.slice';

export const getAddresses = createAsyncThunk('address/get', async (_, thunkAPI) => {
  const state = <AppStateType>thunkAPI.getState();
  const result = await fetchAddresses(state.auth.currentUser?.id);
  return result.data;
});

export const createAddress = createAsyncThunk(
  'address/post',
  async (data: Omit<Address, 'id' | 'country'>, thunkAPI) => {
    try {
      const result = await postAddress(data);

      if (result.status === 201) {
        thunkAPI.dispatch(
          setMessage({ message: 'User address was successfully added!', status: 'success' }),
        );

        return result.data;
      } else {
        throw new Error('An error occured while adding user address. Please, try again later.');
      }
    } catch (error: any) {
      thunkAPI.dispatch(
        setMessage({
          message: 'An error occured while adding user address. Please, try again later.',
          status: 'error',
        }),
      );
    }

    return { ...data, id: 0, country: { name: '' } } as Address;
  },
);

export const editAddress = createAsyncThunk(
  'address/patch',
  async (data: Omit<Address, 'country'>, thunkAPI) => {
    try {
      const result = await patchAddress(data.id, data);

      if (result.status === 200) {
        thunkAPI.dispatch(
          setMessage({ message: 'User address was successfully updated!', status: 'success' }),
        );

        return result.data;
      } else {
        throw new Error('An error occured while updating user address. Please, try again later.');
      }
    } catch (error: any) {
      thunkAPI.dispatch(
        setMessage({
          message: 'An error occured while updating user address. Please, try again later.',
          status: 'error',
        }),
      );
    }

    return { ...data, country: { name: '' } } as Address;
  },
);
