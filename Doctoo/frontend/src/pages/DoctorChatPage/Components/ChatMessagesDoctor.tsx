import React from 'react';
import Message from 'src/pages/ChatsPage/Components/Message';
import { MessageType } from 'src/types/messages.types';
import { useSelector } from 'react-redux';
import { getUser } from 'src/store/slices/auth';

interface ChatMessagesDoctorProps {
  messages: MessageType[];
}

const ChatMessagesDoctor: React.FC<ChatMessagesDoctorProps> = ({ messages }) => {
  const user = useSelector(getUser)!;

  return (
    <div className='overflow-y-scroll w-full bg-bg max-h-[65vh] min-h-[60vh]'>
      {messages.map(message =>
        user.id === message.user_id ? (
          <Message
            key={message.id}
            message_text={message.message_text}
            timestamp={message.timestamp}
            additionalStyle='items-end'
            additionalStyleText='bg-main text-white'
          />
        ) : (
          <Message
            additionalStyleText='justify-end bg-white text-black'
            additionalStyleTime='justify-end text-black'
            key={message.id}
            message_text={message.message_text}
            timestamp={message.timestamp}
          />
        ),
      )}
    </div>
  );
};

export default ChatMessagesDoctor;
