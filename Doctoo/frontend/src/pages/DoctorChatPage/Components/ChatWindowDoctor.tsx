import React, { useEffect, useState } from 'react';
import ChatHeader from './ChatHeaderDoctor';
import ChatMessages from './ChatMessagesDoctor';
import ChatInput from './ChatInputDoctor';
import axios from 'axios';
import { MessageType } from 'src/types/messages.types';
import { useSelector } from 'react-redux';
import { Chat } from 'src/types/chat.types';
import { getUser } from 'src/store/slices/auth';

interface ChatWindowDoctorProps {
  selectedChat: Chat | null | undefined;
  selectedPatient: number | null | undefined;
  showChatHeader?: boolean;
}
const ChatWindowDoctor: React.FC<ChatWindowDoctorProps> = ({
  selectedChat,
  selectedPatient,
  showChatHeader = true,
}) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const user = useSelector(getUser)!;

  useEffect(() => {
    const intervalCall = setInterval(() => {
      fetchMessages();
    }, 3000);
    return () => {
      clearInterval(intervalCall);
    };
  }, [selectedPatient]);

  const fetchMessages = () => {
    if (selectedPatient) {
      axios
        .get(`/api/v1/messages/chat/${selectedChat?.id}`)
        .then(response => {
          setMessages(response.data);
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    }
  };

  const sendMessage = (message: string, awsS3Url: string) => {
    if (selectedPatient) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const date = currentDate.getDate() + 1;
      const hour = currentDate.getHours();
      const minute = currentDate.getMinutes();
      const second = currentDate.getSeconds();

      axios
        .post('/api/v1/messages/create', {
          chat_id: selectedChat?.id,
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
    <div className='flex flex-col w-full h-full justify-between'>
      {showChatHeader && <ChatHeader patient={selectedPatient} />}
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindowDoctor;
