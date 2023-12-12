import { useDispatch} from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { Channels } from '../Channels';
import { Messages } from '../Messages';
import { useEffect } from 'react';
import { getChannelsData } from '../../helpers';

export const ChatPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const { token } = auth.user;
  const header = token ? { Authorization: `Bearer ${token}` } : {};
  console.log(header);
  console.log(token);
  
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(getChannelsData(dispatch, header));
      }
      catch (error) {
        console.log(error);
        auth.logOut();
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  );
};
