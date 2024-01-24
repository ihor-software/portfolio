import React from 'react';
import image from 'src/images/doctor.svg';
import { Chat } from 'src/types/chat.types';

interface ChatListItemDoctorProps {
  chat: Chat;
  onClick: () => void;
}

const ChatListItemDoctor: React.FC<ChatListItemDoctorProps> = ({ chat, onClick }) => {
  return (
    <div className={`flex flex-row p-4 h-20 items-center font-sans`} onClick={onClick}>
      <img src={image} alt='avatar' className='w-7 h-7 mr-2 mb-3 rounded-lg' />
      <div className='flex flex-col w-full'>
        <p className='text-base font-medium'>Patient #. {chat.patient_id}</p>
        <p className='text-xs text-black-2 mt-1'>last message..</p>
      </div>
      <div className='flex flex-col right-full'>
        <p className='text-xs text-grey-4 mb-1'>13:27</p>
        <div className='bg-main rounded-full text-white w-6 h-6 text-center ml-2'>5</div>
      </div>
    </div>
  );
};

export default ChatListItemDoctor;
