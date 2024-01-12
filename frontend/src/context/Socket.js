import { createContext, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentChannel } from '../store/ChannelsSlice';

export const SocketContext = createContext({});

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const newMessage = useCallback(async (messageData) => {
    socket.emit('newMessage', messageData, (response) => {
      if (response.status !== 'ok') {
        console.log('Socket error');
      }
      console.log('socket - OK');
    });
  }, [socket]);

  const newChannel = useCallback(async (newChannelName) => {
    const { data } = await socket.timeout(3000).emitWithAck('newChannel', { name: newChannelName });
    dispatch(setCurrentChannel(data.id));
  }, [dispatch, socket]);

  const removeChannel = useCallback((channelId) => {
    socket.emit('removeChannel', { id: channelId });
  }, [socket]);

  const renameChannel = useCallback((channelId, newChannelName) => {
    socket.emit('renameChannel', { id: channelId, name: newChannelName });
  }, [socket]);

  const context = useMemo(
    () => ({
      newMessage, newChannel, removeChannel, renameChannel,
    }),
    [newMessage, newChannel, removeChannel, renameChannel],
  );

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
