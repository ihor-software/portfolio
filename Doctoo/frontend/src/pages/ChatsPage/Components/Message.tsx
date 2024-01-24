import React from 'react';

interface MessageProps {
  id?: number;
  message_text?: string;
  file?: string;
  timestamp?: string;
  additionalStyle?: string;
  additionalStyleText?: string;
  additionalStyleTime?: string;
}

const Message: React.FC<MessageProps> = ({
  message_text,
  timestamp,
  file,
  additionalStyle,
  additionalStyleText,
}) => {
  return (
    <div className={`flex flex-col m-5 ${additionalStyle}`}>
      <div className={`flex flex-col p-5 rounded-md w-3/4 ${additionalStyleText || ''}`}>
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

export default Message;
