import axios from 'axios';
import { getChannels } from '../store/ChannelsSlice';
import { getMessages } from '../store/MessagesSlice';
import routes from '../routes';

const getChannelsData = (dispatch, header) => async () => {
  const { data } = await axios.get(routes.server.data, {
    headers: header,
  });
  dispatch(getChannels(data));
  dispatch(getMessages(data));
};
export default getChannelsData;
