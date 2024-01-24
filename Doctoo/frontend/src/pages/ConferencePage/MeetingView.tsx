import { useMeeting } from '@videosdk.live/react-sdk';
import Controls from './Controls';
import ParticipantView from './ParticipantView';
import { useEffect, useState } from 'react';
import ChatSidePanel from './ChatSidePanel';
import SpinnerComponent from 'src/ui/common/SpinnerComponent/SpinnerComponent';

import QuickNotes from './QuickNotes';
import QuickChat from './QuickChat';
import QuickDoctorChat from './QuickDoctorChat';
import axios from 'axios';
import { Doctor } from 'src/types/doctor.types';
import { useParams } from 'react-router-dom';

import { useAppSelector } from 'src/hooks/redux';
import { Patient } from 'src/types/patient.types';

function MeetingView({
  onMeetingLeave,
  meetingId,
}: {
  onMeetingLeave: () => void;
  meetingId: string;
}) {
  const [chatOpen, setChatOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const { id: appointment_id } = useParams<{ id: string }>();

  const [joined, setJoined] = useState<string | null>(null);
  const { join } = useMeeting();
  const { participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined('JOINED');
    },
    onMeetingLeft: () => {
      onMeetingLeave();
    },
  });
  const joinMeeting = () => {
    setJoined('JOINING');
    join();
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
    setNotesOpen(false);
  };

  const toggleNotes = () => {
    setNotesOpen(!notesOpen);
    setChatOpen(false);
  };

  const user = useAppSelector(state => state.auth.currentUser);

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const getDoctorFromAppointment = async () => {
      try {
        const response = await axios.get(`/api/v1/appointments/${appointment_id}`);
        console.log(response.data);
        setDoctor(response.data.doctor);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const getPatinetFromAppointment = async () => {
      try {
        const response = await axios.get(`/api/v1/appointments/${appointment_id}`);
        console.log(response.data);
        setPatient(response.data.patient);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (user?.role_cd === 'doctor') {
      getPatinetFromAppointment();
    } else {
      getDoctorFromAppointment();
    }
  }, []);

  return (
    <div className='w-full h-full'>
      {joined && joined === 'JOINED' ? (
        <div className='flex flex-row h-full w-full items-center justify-between'>
          <div className='flex flex-col h-full w-full justify-between items-center'>
            <div className='flex flex-wrap gap-4 h-full w-full justify-center items-center overflow-y-scroll'>
              {[...participants.keys()].map(participantId => (
                <ParticipantView participantId={participantId} key={participantId} />
              ))}
            </div>
            <Controls toggleChat={toggleChat} toggleNotes={toggleNotes} />
          </div>
          <ChatSidePanel isOpen={chatOpen}>
            {user && doctor && <QuickChat doctor={doctor} user={user} />}
            {user && patient && <QuickDoctorChat patient={patient} user={user} />}
          </ChatSidePanel>
          <ChatSidePanel isOpen={notesOpen}>
            {patient && <QuickNotes patient={patient} />}
          </ChatSidePanel>
        </div>
      ) : joined && joined === 'JOINING' ? (
        <div className='flex flex-col h-full w-full justify-center items-center'>
          <SpinnerComponent additionalClass='w-[200px]' />
          <h2 className='text-2xl'>Initialize meeting...</h2>
        </div>
      ) : (
        <div className='flex flex-col h-full w-full justify-center items-center'>
          <SpinnerComponent additionalClass='w-[200px]' />
          <h2 className='text-2xl'>Joining the meeting...</h2>
        </div>
      )}
    </div>
  );
}

export default MeetingView;
