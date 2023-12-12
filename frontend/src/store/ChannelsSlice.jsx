/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelID: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    getChannels(state, { payload }) {
      state.channels = [...payload.channels];
      state.currentChannelId = payload.currentChannelId;
    },
    setCurrentChannel(state, { payload }) {
      state.currentChannelID = payload;
    },
  },
});

export const { getChannels, setCurrentChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
