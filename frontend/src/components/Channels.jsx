import { useSelector, useDispatch } from "react-redux";
import { Button } from 'react-bootstrap'
import { useTranslation } from "react-i18next";
import { setCurrentChannel } from '../store/ChannelsSlice';

export const Channels = () => {
    const { t } = useTranslation();
    const currentChannelID = useSelector((state) => state.channels.currentChannelID);
    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channels.channels);
    const handleChannelClick = (id) => dispatch(setCurrentChannel(id));
  
    const channelsList = channels.map((channel) => (
        <li className="nav-item w-100">
            <Button
                className={`w-100 rounded-0 text-start btn ${channel.id === currentChannelID ? 'btn-primary' : 'btn-light'}`}
                key={channel.id}
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
            </div>
            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channelsList}
            </ul>
        </div>
    )
};