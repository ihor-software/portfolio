import React, { useRef, useState } from 'react';
import attach from 'src/icons/attach.svg';
import sendMessage from 'src/icons/send-message.svg';
import axios from 'axios';

interface ChatInputDoctorProps {
  onSendMessage: (message: string, awsS3Url: string) => void;
}

const ChatInputDoctor: React.FC<ChatInputDoctorProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [awsS3Url, setAwsS3Url] = useState('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message, awsS3Url);
      setMessage('');
      setAwsS3Url('');
    }
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(prevSelectedFile => {
      if (!file) {
        return null;
      }

      const formData = new FormData();
      formData.append('attachments', file);

      axios
        .post('/api/v1/files/upload-attachments', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          const awsS3Url = response.data[0];
          console.log('File uploaded:', awsS3Url);
          setAwsS3Url(awsS3Url);
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });

      return file;
    });
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFileSelect(file);
  };
  return (
    <div className='flex flex-row h-16 p-5 bg-white rounded'>
      <img
        src={attach}
        alt={'Attach File'}
        onClick={handleFileUpload}
        style={{ cursor: 'pointer' }}
      />
      {/* Hidden file input */}
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />
      <input
        type='text'
        placeholder='Write a message...'
        value={message}
        onChange={e => setMessage(e.target.value)}
        className='flex-grow p-2 bg-white outline-none'
      />
      <img
        src={sendMessage}
        alt={'Unknown'}
        onClick={handleSendMessage}
        className='cursor-pointer'
      />
    </div>
  );
};

export default ChatInputDoctor;
