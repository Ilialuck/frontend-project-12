import { createContext, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const SocketContext = createContext({});

const SocketProvider = ({ socket, children }) => {
  const { t } = useTranslation();

  const newMessage = useCallback(async (messageData) => {
    socket.emit('newMessage', messageData, (response) => {
      if (response.status !== 'ok') {
        console.log('Socket error');
      }
      console.log('socket - OK')
    });
  }, [socket, t]);

  const context = useMemo(() => ({ newMessage }), [newMessage]);

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;