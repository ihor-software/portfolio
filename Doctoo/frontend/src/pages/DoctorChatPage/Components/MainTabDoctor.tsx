import React, { useState } from 'react';
import ChatList from './ChatListDoctor';
import ChatWindow from '../Components/ChatWindowDoctor';
import FileList from '../Components/FileListDoctor';
import { Chat } from 'src/types/chat.types';

const MainTabDoctor: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <div className='w-full mb-4'>
      <div className='flex'>
        <div className='w-1/4'>
          <ChatList setSelectedChat={setSelectedChat} setSelectedPatient={setSelectedPatient} />
        </div>
        <div className='w-1/2 bg-white border-x border-grey-9'>
          <ChatWindow selectedPatient={selectedPatient} selectedChat={selectedChat} />
        </div>
        <div className='w-1/4 bg-white rounded-r-xl'>
          <FileList />
        </div>
      </div>
    </div>
  );
};

export default MainTabDoctor;
