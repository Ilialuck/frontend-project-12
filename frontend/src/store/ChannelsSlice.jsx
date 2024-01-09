/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};
const defaultChannelId = 1;

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    getChannels(state, { payload }) {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    },
    setCurrentChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
    removeChannel(state, { payload }) {
      if (state.currentChannelId === payload.id) state.currentChannelId = defaultChannelId;
      state.channels = state.channels.filter((channel) => channel.id !== payload.id);
    },
    renameChannel(state, { payload }) {
      const channel = state.channels.find(({ id }) => id === payload.id);
      channel.name = payload.name;
    },
  },
});

export const {
  getChannels, setCurrentChannel, addChannel, removeChannel, renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
