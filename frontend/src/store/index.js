import { configureStore } from '@reduxjs/toolkit';

export default configureStore ({
    reducer: {
        channels: channelsReducer,
        messages: messagesReducer,
    }
});