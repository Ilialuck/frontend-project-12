import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import io from 'socket.io-client';
import App from './components/pages/App';
import resources from './locales/index.js';
import AuthProvider from './context/Auth.js';
import SocketProvider from './context/Socket.js';
import store from './store/index.js';
import { addMessage } from './store/MessagesSlice.jsx';
import { addChannel, removeChannel, renameChannel } from './store/ChannelsSlice.jsx';
import rollbarConfig from './rollbarConfig.js';

const init = async () => {
  const i18n = i18next.createInstance();
  const socket = io();

  socket.on('newMessage', (payload) => store.dispatch(addMessage(payload)));
  socket.on('newChannel', (payload) => store.dispatch(addChannel(payload)));
  socket.on('removeChannel', (payload) => store.dispatch(removeChannel(payload)));
  socket.on('renameChannel', (payload) => store.dispatch(renameChannel(payload)));

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <SocketProvider socket={socket}>
            <I18nextProvider i18n={i18n}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </I18nextProvider>
          </SocketProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
