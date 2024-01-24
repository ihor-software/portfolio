import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Notification } from 'src/types/notification.types';

type SearchStateType = {
  search: string;
};

const searchSlice = createSlice({
  name: 'search',
  initialState: { search: '' } as SearchStateType,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const searchSliceActions = searchSlice.actions;

export default searchSlice.reducer;
