import React, { useState } from 'react';
import icons from 'src/ui/common/Icon/iconPaths';
import MainTabDoctor from 'src/pages/DoctorChatPage/Components/MainTabDoctor';

type ActiveTab = 'chatTab' | 'vAssistantChat';

const DoctorChatPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chatTab');

  return (
    <div className='pl-8 pr-8 w-full h-full'>
      <div className='flex flex-row pt-5 pb-5'>
        <img src={icons.chats} alt={'Unknown'} className=' w-8 h-8 left-0' />
        <div className='text-2xl ml-2 text-black-1'>Chats</div>
      </div>
      <MainTabDoctor />
    </div>
  );
};

export default DoctorChatPage;
