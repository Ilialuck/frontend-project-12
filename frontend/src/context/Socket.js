import { createContext, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../store/ChannelsSlice';

export const SocketContext = createContext({});

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const newMessage = useCallback(async (messageData) => {
    socket.emit('newMessage', messageData, (response) => {
      if (response.status !== 'ok') {
        toast.error(t('notifications.errors.messageError'));
      }
    });
  }, [socket, t]);

  const newChannel = useCallback(async (newChannelName) => {
    const { data } = await socket.emitWithAck('newChannel', { name: newChannelName });
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
