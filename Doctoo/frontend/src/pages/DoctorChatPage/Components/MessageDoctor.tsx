import React from 'react';

interface MessageDoctorProps {
  id?: number;
  message_text?: string;
  file?: string;
  timestamp?: string;
}

const MessageDoctor: React.FC<MessageDoctorProps> = ({ message_text, timestamp, file }) => {
  return (
    <div className='flex flex-col m-5'>
      <div className='flex flex-col bg-main text-white p-5 rounded-md w-3/4'>
        {message_text}
        {file && (
          <a href={file} target='_blank' rel='noopener noreferrer'>
            View File
          </a>
        )}
      </div>
      <div className='m-2 text-xs text-grey-2'>{timestamp}</div>
    </div>
  );
};

export default MessageDoctor;
