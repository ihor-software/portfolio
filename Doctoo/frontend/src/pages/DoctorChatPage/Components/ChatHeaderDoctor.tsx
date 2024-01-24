import React from 'react';
import image from 'src/images/doctor.svg';

interface ChatHeaderDoctorProps {
  patient?: number | null;
}

const ChatHeaderDoctor: React.FC<ChatHeaderDoctorProps> = ({ patient }) => {
  return (
    <div className='flex flex-row w-full h-20 p-5 font-sans'>
      {patient ? (
        <img src={image} alt={'Unknown'} className=' w-10 h-10 left-0 align-middle rounded-lg' />
      ) : (
        ''
      )}
      <div className='flex flex-col pl-4'>
        <span className='text-base font-medium'>{patient ? 'Patient # ' + patient : ''}</span>
      </div>
    </div>
  );
};

export default ChatHeaderDoctor;
