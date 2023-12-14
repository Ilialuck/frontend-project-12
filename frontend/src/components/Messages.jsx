import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { MessagesForm } from './MessagesForm';

export const Messages = () => {
  const messagesRef = useRef(null);
  const { channels, currentChannelID } = useSelector((state) => state.channels);
  const currentChannel = channels.filter((channel) => currentChannelID === channel.id)[0];
  const currentName = currentChannel ? currentChannel.name : '';
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messages.messages);
  const currentMessages = messages.filter((message) => message.channelId === currentChannelID);

  const messagesList = currentMessages.map((message) => (
    <div className='text-break mb-2' key={message.id}>
      <b>{message.username}</b>
      {`: ${message.body}`}
    </div>
  ));


  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b>{`# ${currentName}`}</b></p>
          <span className="text-muted">{t('messagesCounter.messages', { count: currentMessages.length })}</span>
        </div>
        <div id="messages-box" ref={messagesRef} className="chat-messages overflow-auto px-5">
          {messagesList}
        </div>
        <MessagesForm />
      </div>
     </div>
  );
};
