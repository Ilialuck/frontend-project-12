import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './ChannelsSlice';
import messagesReducer from './MessagesSlice';

export default configureStore ({
    reducer: {
        channels: channelsReducer,
        messages: messagesReducer,
    }
});