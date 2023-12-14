import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import App from './components/App';
import resources from './locales/index.js';
import AuthProvider from './context/Auth.js';
import SocketProvider from './context/Socket.js';
import store from '../src/store/index.js';
import { addMessage } from './store/MessagesSlice.jsx';

const init = async () => {
  const i18n = i18next.createInstance();
  const socket = io();

  socket.on('newMessage', (payload) => store.dispatch(addMessage(payload)));


  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </I18nextProvider>
      </SocketProvider>
    </Provider>
  );
};

export default init;