import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        
    }
});

export const {  } = messagesSlice.actions;
export default messagesSlice.reducer;