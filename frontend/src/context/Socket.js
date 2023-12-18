import { createContext, useMemo, useCallback } from 'react';


export const SocketContext = createContext({});

const SocketProvider = ({ socket, children }) => {

  const newMessage = useCallback(async (messageData) => {
    socket.emit('newMessage', messageData, (response) => {
      if (response.status !== 'ok') {
        console.log('Socket error');
      }
      console.log('socket - OK')
    });
  }, [socket]);

  const newChannel = useCallback((newChannelName) => {
    socket.emit('newChannel', { name: newChannelName });
  }, [socket]);

  const context = useMemo(() => ({ newMessage, newChannel }), [newMessage, newChannel]);

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;