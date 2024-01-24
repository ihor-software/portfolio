import React from 'react';
import { Doctor } from 'src/types/doctor.types';
import image from 'src/images/doctor.svg';

interface ChatListItemProps {
  doctor: Doctor;
  onClick: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ doctor, onClick }) => {
  return (
    <div className={`flex flex-row p-4 h-20 items-center font-sans`} onClick={onClick}>
      <img
        src={doctor.user?.avatar || image}
        alt='avatar'
        className='w-7 h-7 mr-2 mb-3 rounded-lg'
      />
      <div className='flex flex-col w-full'>
        <p className='text-base font-medium'>
          Dr. {doctor.user?.first_name} {doctor.user?.last_name}
        </p>
        <p className='text-xs text-black-2 mt-1'>last message..</p>
      </div>
      <div className='flex flex-col right-full'>
        <p className='text-xs text-grey-4 mb-3'>13:27</p>
      </div>
    </div>
  );
};

export default ChatListItem;
