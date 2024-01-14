import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect } from 'react';
import { setCurrentChannel } from '../store/ChannelsSlice';
import { openModal } from '../store/ModalSlice';
import AddChannelIcon from '../assets/AddChannelIcon';
import ChannelsList from './ChannelsList';

const Channels = () => {
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const addButtonRef = useRef(null);
  const channelsListRef = useRef(null);

  const handleChannelClick = (id) => dispatch(setCurrentChannel(id));
  const hendleAddChannel = () => dispatch(openModal({ type: 'addChannel' }));
  const handleRemoveChannel = (id) => dispatch(openModal({ type: 'removeChannel', extra: { channelId: id } }));
  const handleRenameChannel = (id) => dispatch(openModal({ type: 'renameChannel', extra: { channelId: id } }));

  useEffect(() => {
    const focusedChannel = channels.find((channel) => channel.id === currentChannelId);
    const lastChannel = channels[channels.length - 1];
    if (channelsListRef.current) {
      channelsListRef.current.scrollTop = 0;
    } else if (focusedChannel && focusedChannel.id === lastChannel.id) {
      channelsListRef.current.scrollTop = channelsListRef.current.scrollHeight;
    }
  }, [channels, currentChannelId]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <button
          ref={addButtonRef}
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={hendleAddChannel}
        >
          <AddChannelIcon />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul ref={channelsListRef} id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        <ChannelsList
          channels={channels}
          currentChannelId={currentChannelId}
          handleChannelClick={handleChannelClick}
          handleRemoveChannel={handleRemoveChannel}
          handleRenameChannel={handleRenameChannel}
        />
      </ul>
    </div>
  );
};
export default Channels;
