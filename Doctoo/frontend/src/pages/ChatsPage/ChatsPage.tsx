import React, { useState } from 'react';
import VirtualAssistantTab from 'src/pages/ChatsPage/Components/VirtualAssistantTab';
import DoctorsTab from 'src/pages/ChatsPage/Components/DoctorsTab';
import icons from 'src/ui/common/Icon/iconPaths';
import { Icon } from 'src/ui/common';

type ActiveTab = 'chatTab' | 'vAssistantChat';

const ChatsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chatTab');

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  return (
    <div className='pl-8 pr-8 w-full h-full'>
      <div className='flex flex-row pt-5 pb-5'>
        <Icon src={icons.chats} alt='chat icon' iconColor='main' />
        <div className='text-2xl ml-2 text-black-1'>Chats</div>
      </div>

      <div className='flex flex-row text-center'>
        <div
          className={`p-2 w-40 cursor-pointer rounded-t-xl ${
            activeTab === 'chatTab' ? 'bg-white' : 'bg-main-light'
          }`}
          onClick={() => handleTabClick('chatTab')}
        >
          Doctors
        </div>
        <div
          className={`p-2 w-40 cursor-pointer rounded-t-xl ${
            activeTab === 'vAssistantChat' ? 'bg-white' : 'bg-main-light'
          }`}
          onClick={() => handleTabClick('vAssistantChat')}
        >
          Virtual Assistant
        </div>
      </div>

      <div className='flex'>
        {activeTab === 'chatTab' ? <DoctorsTab /> : <VirtualAssistantTab />}
      </div>
    </div>
  );
};

export default ChatsPage;
