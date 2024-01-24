import React from 'react';
import image from 'src/images/doctor.svg';
import { Doctor } from 'src/types/doctor.types';

interface ChatHeaderProps {
  selectedDoctor?: Doctor | null;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ selectedDoctor }) => {
  return (
    <div className='flex flex-row w-full h-20 p-5 font-sans'>
      {selectedDoctor ? (
        <img src={image} alt={'Unknown'} className=' w-10 h-10 left-0 align-middle rounded-lg' />
      ) : (
        ''
      )}
      <div className='flex flex-col pl-4'>
        <span className='text-base font-medium'>
          {selectedDoctor
            ? 'Doctor ' + selectedDoctor?.user.first_name + ' ' + selectedDoctor.user.last_name
            : ''}
        </span>
        <span className='text-sm text-grey-1'>{selectedDoctor ? 'Therapist' : ''}</span>
      </div>
    </div>
  );
};

export default ChatHeader;
