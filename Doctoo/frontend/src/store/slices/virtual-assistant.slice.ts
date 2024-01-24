import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppDispatchType, AppStateType, store } from '..';
import { MessageType } from 'src/types/virtual-assistant.types';
import axios from 'axios';

export type VirtualAssistantState = {
  messages: MessageType[];
};

const initialState: VirtualAssistantState = {
  messages: [],
};

const virtualAssistantSlice = createSlice({
  name: 'virtualAssistant',
  initialState,
  reducers: {
    setVirtualAssistantChatMessages(state, action: PayloadAction<MessageType[]>) {
      return { ...state, messages: action.payload };
    },
    deleteVirtualAssistantChatMessages(state) {
      return { ...state, messages: [] };
    },
    addVirtualAssistantChatMessage(state, action: PayloadAction<MessageType>) {
      return { ...state, messages: [...state.messages, action.payload] };
    },
  },
});

export const fetchAllMessages = () => async (dispatch: AppDispatchType) => {
  const messages = await axios.get('/api/v1/virtual-assistant/messages');

  if (messages.status === 200) {
    dispatch(virtualAssistantSlice.actions.setVirtualAssistantChatMessages(messages.data));
  }
};

export const deleteAllMessages = () => async (dispatch: AppDispatchType) => {
  const response = await axios.delete('/api/v1/virtual-assistant/messages');

  dispatch(virtualAssistantSlice.actions.deleteVirtualAssistantChatMessages());
};

export const sendMessage = (message: any) => async (dispatch: AppDispatchType) => {
  const response = await axios.post(
    '/api/v1/virtual-assistant/send-message',
    JSON.stringify(message),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data;
};

export const getAllMessages = (state: AppStateType) => {
  return state.virtualAssistant.messages;
};

export const {} = virtualAssistantSlice.actions;

export default virtualAssistantSlice.reducer;
