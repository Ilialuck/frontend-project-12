import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessages(state, { payload }) {
      state.messages = payload.messages;
    },
    addMessage(state, { payload }) {
      state.messages.push(payload);
    },
  },
});

export const { getMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
