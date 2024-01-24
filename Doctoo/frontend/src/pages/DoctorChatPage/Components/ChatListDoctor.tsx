import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chat } from 'src/types/chat.types';
import { useSelector } from 'react-redux';
import ChatListItemDoctor from './ChatListItemDoctor';
import { getUser } from 'src/store/slices/auth';
import icons from 'src/ui/common/Icon/iconPaths';
import { Icon } from 'src/ui/common';

const ChatListDoctor: React.FC<{
  setSelectedChat: (chat: Chat | null) => void;
  setSelectedPatient: (patient: number | null) => void;
}> = ({ setSelectedChat, setSelectedPatient }) => {
  const [chatList, setChatsList] = useState<Chat[]>([]);
  const user = useSelector(getUser)!;

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    axios
      .get(`/api/v1/chats/doctor/${user.id}`)
      .then(response => {
        setChatsList(response.data);
      })
      .catch(error => {
        console.error('Error fetching chat data:', error);
      });
  }, []);

  const handleChatItemClick = (chat: Chat) => {
    setSelectedChat(chat);
    setSelectedPatient(chat.patient_id);
  };

  return (
    <div className='h-[90%] bg-white rounded-bl-lg'>
      <div className='p-5'>
        <div className='flex items-center bg-grey-5 rounded-lg w-full '>
          <Icon src={icons.search} alt='search' iconColor='search' />
          <input
            className='bg-grey-5 search w-1/2 h-full border-none rounded-lg font-sans font-thin text-base outline-none'
            placeholder={'Search'}
          />
        </div>
      </div>
      <div className='border-b border-grey-9 max-h-[57.4vh] overflow-y-scroll'>
        {(chatList as Chat[]).map(chat => (
          <ChatListItemDoctor
            key={chat.patient_id}
            onClick={() => handleChatItemClick(chat)}
            chat={chat}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatListDoctor;
