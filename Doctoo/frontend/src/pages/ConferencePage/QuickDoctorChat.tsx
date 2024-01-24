import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doctor } from 'src/types/doctor.types';
import { Chat } from 'src/types/chat.types';
import { useSelector } from 'react-redux';
import { getUser as selectUser } from 'src/store/slices/auth';
import { Icon } from 'src/ui/common';
import icons from 'src/ui/common/Icon/iconPaths';
import { User } from 'src/types/user.types';
import ChatWindowDoctor from '../DoctorChatPage/Components/ChatWindowDoctor';
import { useParams } from 'react-router-dom';
import { Patient } from 'src/types/patient.types';

interface ChatSidePanelProps {
  patient: Patient;
  user: User;
}

function QuickDoctorChat({ patient, user }: ChatSidePanelProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [verifiedChat, setVerifiedChat] = useState<Chat | null>(null);
  const { id: appointment_id } = useParams<{ id: string }>();

  useEffect(() => {
    const getPatientFromAppointment = async () => {
      try {
        const response = await axios.get(`/api/v1/appointments/${appointment_id}`);

        setSelectedPatient(response.data.patient);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/v1/chats/verify/?doctor_id=${user.id}&patient_id=${patient.user_id}`,
        );

        if (!response.data?.id) {
          const createChatResponse = await axios.post('/api/v1/chats', {
            doctor_id: user.id,
            patient_id: patient.user_id,
          });

          const verifiedChat = createChatResponse.data;
          setVerifiedChat(verifiedChat);
        } else {
          setSelectedPatient(patient);
          const verifiedChat = response.data;
          setVerifiedChat(verifiedChat);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getPatientFromAppointment();
    fetchData();
  }, []);

  return (
    <>
      {verifiedChat?.id ? (
        <ChatWindowDoctor
          selectedPatient={selectedPatient?.user_id}
          selectedChat={verifiedChat}
          showChatHeader={false}
        />
      ) : null}
    </>
  );
}

export default QuickDoctorChat;
