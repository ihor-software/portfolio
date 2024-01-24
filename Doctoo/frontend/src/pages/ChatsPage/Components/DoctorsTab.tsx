import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from '../Components/ChatWindow';
import FileList from 'src/pages/ChatsPage/Components/FileList';
import { Doctor } from 'src/types/doctor.types';
import { Chat } from 'src/types/chat.types';

const DoctorsTab: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [verifiedChat, setVerifiedChat] = useState<Chat | null>(null);

  return (
    <div className='w-full mb-4'>
      <div className='flex items-stretch'>
        <div className='w-1/4'>
          <ChatList
            selectedDoctor={selectedDoctor}
            setSelectedDoctor={setSelectedDoctor}
            setVerifiedChat={setVerifiedChat}
          />
        </div>
        <div className='w-1/2 bg-white border-x border-grey-9'>
          <ChatWindow selectedDoctor={selectedDoctor} verifiedChat={verifiedChat} />
        </div>
        <div className='w-1/4 bg-white rounded-r-xl'>
          <FileList />
        </div>
      </div>
    </div>
  );
};

export default DoctorsTab;
