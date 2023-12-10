import { useTranslation } from 'i18next';
import { useDispatch} from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { getChannels } from '../../store/ChannelsSlice';
import { getMessages } from '../../store/MessagesSlice';
import { Channels } from '../Channels';
import { Messages } from '../Messages';

export const ChatPage = () => {
  


  return (
    
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  );
};
