import React, { useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import axios from 'axios';
import { MessageType } from 'src/types/messages.types';
import { useSelector } from 'react-redux';
import { getUser as selectUser } from 'src/store/slices/auth/auth.slice';
import { Doctor } from 'src/types/doctor.types';
import { Chat } from 'src/types/chat.types';

interface ChatWindowProps {
  selectedDoctor: Doctor | null;
  verifiedChat: Chat | null;
  showChatHeader?: boolean;
}
const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedDoctor,
  verifiedChat,
  showChatHeader = true,
}) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const user = useSelector(selectUser)!;

  useEffect(() => {
    const intervalCall = setInterval(() => {
      fetchMessages();
    }, 3000);
    return () => {
      clearInterval(intervalCall);
    };
  }, [verifiedChat]);

  const fetchMessages = () => {
    if (verifiedChat) {
      axios
        .get(`/api/v1/messages/chat/${verifiedChat.id}`)
        .then(response => {
          setMessages(response.data);
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    }
  };

  const sendMessage = (message: string, awsS3Url: string) => {
    if (verifiedChat) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const date = currentDate.getDate() + 1;
      const hour = currentDate.getHours();
      const minute = currentDate.getMinutes();
      const second = currentDate.getSeconds();

      axios
        .post('/api/v1/messages/create', {
          chat_id: verifiedChat.id,
          message_text: message,
          file: awsS3Url,
          timestamp: `${year}-${month < 10 ? `0${month}` : month}-${
            date < 10 ? `0${date}` : date
          } ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${
            second < 10 ? `0${second}` : second
          }`,
          user_id: user.id,
        })
        .then(response => {
          setMessages([...messages, response.data]);
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    }
  };

  return (
    <div className='bg-inherit flex w-full h-full flex-col justify-between'>
      {showChatHeader && <ChatHeader selectedDoctor={selectedDoctor} />}
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
