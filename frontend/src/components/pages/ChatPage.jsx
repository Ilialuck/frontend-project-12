import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import routes from '../../routes';
import { useAuth } from '../../hooks';
import { getChannels } from '../../store/ChannelsSlice';
import { getMessages } from '../../store/MessagesSlice';
import getModalComponent from '../Modals';
import { Channels } from '../Channels';
import { Messages } from '../Messages';


export const ChatPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const { token } = auth.user;
  const header = token ? { Authorization: `Bearer ${token}` } : {};
  const type = useSelector((state) => state.modals.type);
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
      <div className="row h-100 bg-light flex-md-row">
        <Channels />
        <Messages/>
        {getModalComponent(type)}
      </div>
    </div>
  );
};
