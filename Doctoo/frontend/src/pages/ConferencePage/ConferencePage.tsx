import { FC, useEffect, useState } from 'react';
import { MeetingProvider, MeetingConsumer } from '@videosdk.live/react-sdk';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeNavbar, openNavbar } from 'src/store/slices/navbar/navbar.slice';
import { useAppSelector } from 'src/hooks/redux';
import MeetingView from './MeetingView';

import MainLogo from 'src/ui/Navigation/components/MainLogo/MainLogo';
import { ROUTES } from 'src/utils/routes';

import axiosInstance from 'src/store/services/api';

const ConferencePage: FC = () => {
  const { id: appointment_id } = useParams<{ id: string }>();
  const [token, setToken] = useState<string | null>(null);
  const [meetingId, setMeetingId] = useState<string | null>(null);

  const user = useAppSelector(state => state.auth.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(closeNavbar());

    const getToken = async () => {
      const response = await axiosInstance.get(`/appointments/get-token`);
      setToken(response.data.token);
    };

    getToken();

    return () => {
      dispatch(openNavbar());
    };
  }, []);

  useEffect(() => {
    if (!token) return;

    const getRoom = async () => {
      const response = await axiosInstance.post(`/appointments/create-meeting`, {
        customRoomId: appointment_id,
        token: token,
      });
      setMeetingId(response?.data?.roomId);
    };

    getRoom();
  }, [token]);

  const onMeetingLeave = () => {
    navigate(ROUTES.DASHBOARD);
  };

  return token && meetingId ? (
    <div className='h-screen w-full max-w-full max-h-full'>
      <div className='bg-main h-18 w-full overflow-hidden flex align-middle p-5 absolute top-0 left-0'>
        <MainLogo />
      </div>
      <MeetingProvider
        config={{
          meetingId: meetingId as string,
          micEnabled: true,
          webcamEnabled: true,
          name: user?.first_name + ' ' + user?.last_name,
        }}
        token={token}
        joinWithoutUserInteraction={true}
      >
        <MeetingConsumer>
          {() => <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />}
        </MeetingConsumer>
      </MeetingProvider>
    </div>
  ) : null;
};

export default ConferencePage;
