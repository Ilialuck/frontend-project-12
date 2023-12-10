import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    channels: [],
    currentChannelID: 0,
};

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        getChannels: (state, { payload }) => {
            state.channels = payload.channels;
            state.currentChannelID = payload.currentChannelID;
        }
    }
});

export const { getChannels } = channelsSlice.actions;
export default channelsSlice.reducer;
