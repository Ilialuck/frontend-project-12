import { useDispatch} from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from '../../hooks';
import { getChannels } from '../../store/ChannelsSlice';
import { getMessages } from '../../store/MessagesSlice';
import routes from '../../routes';
import { Channels } from '../Channels';
import { Messages } from '../Messages';

export const ChatPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const { token } = auth.user;
  const header = token ? { Authorization: `Bearer ${token}` } : {};
  console.log(header);
  console.log(token);
  
  useEffect(() => {
    const getInitialData = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      try {
        const { data } = await axios.get(routes.server.data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        dispatch(getChannels(data));
        dispatch(getMessages(data));
      } catch(e) {
        throw e;
      }
    };
    getInitialData();
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages/>
      </div>
    </div>
  );
};
