import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './ChannelsSlice';
import messagesReducer from './MessagesSlice';
import modalsReducer from './ModalSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
});
