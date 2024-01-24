import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doctor } from 'src/types/doctor.types';
import { Chat } from 'src/types/chat.types';
import { useSelector } from 'react-redux';
import { getUser as selectUser } from 'src/store/slices/auth';
import { Icon } from 'src/ui/common';
import icons from 'src/ui/common/Icon/iconPaths';
import { User } from 'src/types/user.types';
import ChatWindow from 'src/pages/ChatsPage/Components/ChatWindow';
import { useParams } from 'react-router-dom';

interface ChatSidePanelProps {
  doctor: Doctor;
  user: User;
}

function QuickChat({ doctor, user }: ChatSidePanelProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [verifiedChat, setVerifiedChat] = useState<Chat | null>(null);
  const { id: appointment_id } = useParams<{ id: string }>();

  useEffect(() => {
    const getDoctorFromAppointment = async () => {
      try {
        const response = await axios.get(`/api/v1/appointments/${appointment_id}`);

        setSelectedDoctor(response.data.doctor);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/v1/chats/verify/?doctor_id=${doctor.user_id}&patient_id=${user.id}`,
        );

        if (!response.data?.id) {
          const createChatResponse = await axios.post('/api/v1/chats', {
            doctor_id: doctor.user_id,
            patient_id: user.id,
          });

          const verifiedChat = createChatResponse.data;
          setVerifiedChat(verifiedChat);
        } else {
          setSelectedDoctor(doctor);
          const verifiedChat = response.data;
          setVerifiedChat(verifiedChat);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getDoctorFromAppointment();
    fetchData();
  }, []);

  return (
    <div className='flex flex-col w-full h-full overflow-hidden'>
      <ChatWindow
        selectedDoctor={selectedDoctor}
        verifiedChat={verifiedChat}
        showChatHeader={false}
      />
    </div>
  );
}

export default QuickChat;
