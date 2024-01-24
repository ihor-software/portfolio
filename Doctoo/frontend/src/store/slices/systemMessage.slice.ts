import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStateType } from 'src/store';

interface SystemMessage {
  message: string | null;
  status: 'info' | 'error' | 'success' | null;
}

const initialState: SystemMessage = {
  message: null,
  status: null,
};

const systemMessage = createSlice({
  name: 'systemMessage',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<SystemMessage>) => {
      return { ...state, ...action.payload };
    },

    deleteMessage: () => {
      return initialState;
    },
  },
});

export const { setMessage, deleteMessage } = systemMessage.actions;

export const systemMessageReducer = systemMessage.reducer;

export const getMessage = (state: AppStateType) => state.systemMessage;
