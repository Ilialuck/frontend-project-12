import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks';
import getModalComponent from '../Modals';
import { Channels } from '../Channels';
import { Messages } from '../Messages';
import { getChannelsData } from '../../helpers';

export const ChatPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const { t } = useTranslation();
  const { token } = auth.user;
  const header = token ? { Authorization: `Bearer ${token}` } : {};
  const type = useSelector((state) => state.modals.type);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getChannelsData(dispatch, header));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error(t('notifications.errors.loginFail'));
          auth.logOut();
        } else {
          toast.error(t('notifications.errors.loadDataError'));
        }
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-light flex-md-row">
        <Channels />
        <Messages />
        {getModalComponent(type)}
      </div>
    </div>
  );
};
