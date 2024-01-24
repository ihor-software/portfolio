import React, { useEffect, useState } from 'react';
import ChatListItem from './ChatListItem';
import axios from 'axios';
import { Doctor } from 'src/types/doctor.types';
import { Chat } from 'src/types/chat.types';
import { useSelector } from 'react-redux';
import { getUser as selectUser } from 'src/store/slices/auth';
import { Icon } from 'src/ui/common';
import icons from 'src/ui/common/Icon/iconPaths';

const ChatList: React.FC<{
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doctor: Doctor | null) => void;
  setVerifiedChat: (chat: Chat | null) => void;
}> = ({ selectedDoctor, setSelectedDoctor, setVerifiedChat }) => {
  const [doctorList, setDoctorList] = useState<Doctor[]>([]);
  const user = useSelector(selectUser)!;

  useEffect(() => {
    axios
      .get('/api/v1/doctors')
      .then(response => {
        setDoctorList(response.data);
      })
      .catch(error => {
        console.error('Error fetching chat data:', error);
      });
  }, []);

  const handleChatItemClick = (doctor: Doctor) => {
    console.log(doctor.user.first_name);
    axios
      .get(`/api/v1/chats/verify/?doctor_id=${doctor.user_id}&patient_id=${user.id}`)
      .then(response => {
        if (!response.data?.id) {
          axios
            .post('/api/v1/chats', {
              doctor_id: doctor.user_id,
              patient_id: user.id,
            })
            .then(response => {
              const verifiedChat = response.data;
              setVerifiedChat(verifiedChat);
            })
            .catch(error => {
              console.error('Error creating chat:', error);
            });
        } else {
          setSelectedDoctor(doctor);
          const verifiedChat = response.data;
          setVerifiedChat(verifiedChat);
        }
      })
      .catch(error => {
        console.error('Error verifying chat:', error);
      });
  };

  return (
    <div className='h-[90%] bg-white rounded-bl-lg'>
      <div className='p-5'>
        <div className='flex items-center bg-grey-5 rounded-lg w-full '>
          <Icon src={icons.search} alt='search' iconColor='search' />
          <input
            className='bg-grey-5 search w-1/2 h-full border-none rounded-lg font-sans font-thin text-base outline-none'
            placeholder={'Search'}
          />
        </div>
      </div>
      <div className='border-b border-grey-9 max-h-[57.4vh] overflow-y-scroll'>
        {(doctorList as Doctor[]).map(doctor => (
          <ChatListItem
            key={doctor.user_id}
            onClick={() => handleChatItemClick(doctor)}
            doctor={doctor}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
