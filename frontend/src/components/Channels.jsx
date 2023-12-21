import { useSelector, useDispatch } from "react-redux";
import { Button } from 'react-bootstrap'
import { useTranslation } from "react-i18next";
import { setCurrentChannel } from '../store/ChannelsSlice';
import { useRef, useEffect, useState } from "react";
import { openModal } from "../store/ModalSlice";
import { AddChannelIcon } from "../assets/AddChannelIcon";

export const Channels = () => {
    const { t } = useTranslation();
    const { channels, currentChannelId} = useSelector((state) => state.channels)
    const dispatch = useDispatch();
    const addButtonRef = useRef(null);
    const [prevChannelsLength, setPrevChannelsLength] = useState(null);

    const handleChannelClick = (id) => dispatch(setCurrentChannel(id));
    const hendleAddChannel = () => dispatch(openModal({ type: 'addChannel' }));

    useEffect(() => {
        if (channels.length > prevChannelsLength && prevChannelsLength && channels.length !== 2) {
          const currentId = channels[channels.length - 1].id;
          dispatch(setCurrentChannel(currentId));
        }
        setPrevChannelsLength(channels.length);
        addButtonRef.current.focus();
      }, [channels, dispatch, prevChannelsLength, addButtonRef]);

    const channelsList = channels.map((channel) => (
        <li className="nav-item w-100" key={channel.id}>
            <Button
                className={`w-100 rounded-0 text-start btn ${channel.id === currentChannelId ? 'btn-primary' : 'btn-light'}`}
                onClick={() => handleChannelClick(channel.id)}
            >
                <span className="me-1">#</span>
                {channel.name}
            </Button>
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
                    on
                >
                    <AddChannelIcon/>
                    <span className="visually-hidden">+</span>
                </button>
            </div>
            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channelsList}
            </ul>
        </div>
    )
};