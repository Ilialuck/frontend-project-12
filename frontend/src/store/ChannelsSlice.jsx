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
  },
});

export const { getChannels, setCurrentChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
