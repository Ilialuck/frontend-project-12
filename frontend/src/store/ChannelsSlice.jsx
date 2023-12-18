/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    getChannels(state, { payload }) {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
      console.log(state.currentChannelId)
    },
    setCurrentChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
  },
});

export const { getChannels, setCurrentChannel, addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
