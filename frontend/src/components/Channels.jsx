import { useSelector, useDispatch } from 'react-redux';
import { Button, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { setCurrentChannel } from '../store/ChannelsSlice';
import { openModal } from '../store/ModalSlice';
import { AddChannelIcon } from '../assets/AddChannelIcon';

export const Channels = () => {
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const addButtonRef = useRef(null);
  const [channelsLength, setchannelsLength] = useState(null);

  const handleChannelClick = (id) => dispatch(setCurrentChannel(id));
  const hendleAddChannel = () => dispatch(openModal({ type: 'addChannel' }));
  const handleRemoveChannel = (id) => dispatch(openModal({ type: 'removeChannel', extra: { channelId: id } }));
  const handleRenameChannel = (id) => dispatch(openModal({ type: 'renameChannel', extra: { channelId: id } }));

  useEffect(() => {
    if (channels.length > channelsLength && channelsLength && channels.length !== 2) {
      const currentId = channels[channels.length - 1].id;
      dispatch(setCurrentChannel(currentId));
    }
    setchannelsLength(channels.length);
    addButtonRef.current.focus();
  }, [channels, dispatch, channelsLength, addButtonRef]);

  const channelsList = channels.map((channel) => (
    <li className="nav-item w-100" key={channel.id}>
      {channel.removable ? (
        <div role="group" className="d-flex dropdown btn-group">
          <Button
            className="w-100 rounded-0 text-start text-truncate "
            variant={channel.id === currentChannelId ? 'secondary' : 'light'}
            onClick={() => handleChannelClick(channel.id)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          <Dropdown>
            <Dropdown.Toggle
              id={`dropdownToggle_${channel.id}`}
              type="button"
              aria-expanded="false"
              className="flex-grow-0 dropdown-toggle dropdown-toggle-split "
              variant={channel.id === currentChannelId ? 'secondary' : 'light'}
            >
              <span className="visually-hidden">{t('modals.dropdown.control')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleRemoveChannel(channel.id)}>{t('modals.dropdown.remove')}</Dropdown.Item>
              <Dropdown.Item onClick={() => handleRenameChannel(channel.id)}>{t('modals.dropdown.rename')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ) : (
        <Button
          className="w-100 rounded-0 text-start"
          variant={channel.id === currentChannelId ? 'secondary' : 'light'}
          onClick={() => handleChannelClick(channel.id)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      )}
    </li>
  ));

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
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channelsList}
      </ul>
    </div>
  );
};
