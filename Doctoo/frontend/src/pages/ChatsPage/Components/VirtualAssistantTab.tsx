import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import ChatInput from 'src/pages/ChatsPage/Components/ChatInput';
import { fetchAllAppointments, updateAppointment } from 'src/store/slices/appointment.slice';
import { fetchDoctorById, getSelectedDoctor } from 'src/store/slices/doctor.slice';
import { setMessage } from 'src/store/slices/systemMessage.slice';
import {
  deleteAllMessages,
  fetchAllMessages,
  getAllMessages,
  sendMessage as postMessage,
} from 'src/store/slices/virtual-assistant.slice';
import DashboardCard from 'src/ui/forDashboard/cards/DashboardCard';
import { MessageType } from 'src/types/virtual-assistant.types';
import { Button, Icon } from 'src/ui/common';
import DoctorModal from 'src/ui/common/DoctorModal/DoctorModal';
import icons from 'src/ui/common/Icon/iconPaths';
import { v4 as uuid } from 'uuid';
import doctorAvatarMock from '../../../images/doctor.svg';
import { Appointment, AppointmentStatus } from 'src/types/appointment.types';

const VirtualAssistantMessage: FC<{ message: MessageType }> = ({ message }) => {
  const [state, setState] = useState<{ doctor?: any; message: MessageType }>({
    doctor: undefined,
    message,
  });
  const dispatch = useAppDispatch();
  const selectedDoctor = useAppSelector(getSelectedDoctor);
  const navigate = useNavigate();

  return (
    <>
      {state.doctor && (
        <DoctorModal
          doctor={state.doctor}
          isOpened={state.doctor !== undefined}
          onClose={() => setState({ ...state, doctor: undefined })}
          onBook={() => {
            setState({ ...state, doctor: undefined });
            navigate('/appointments');
            dispatch(
              setMessage({ message: 'Appointments was successfully created', status: 'success' }),
            );
            dispatch(fetchAllAppointments());
          }}
        />
      )}
      <div className='grid grid-cols-2 gap-2'>
        {message.containsDoctorsList === true ? (
          (message.available_doctors?.length ?? 0) > 0 ? (
            message.available_doctors?.map(doctor => (
              <div
                key={uuid()}
                className='bg-white p-4 rounded-xl flex w-full items-center justify-between'
              >
                <div className='flex items-center'>
                  <img
                    src={doctor.user?.avatar ?? icons.account}
                    alt='Doctor image'
                    className='rounded-md object-cover bg-bg w-[40px] h-[40px]'
                  />
                  <span className='ml-5 font-medium'>
                    {doctor.user?.first_name} {doctor.user?.last_name} (
                    {(doctor.specialty as any)?.specialty})
                  </span>
                </div>

                <Button
                  additionalStyle='align-self-end max-w-[100px]'
                  onClick={async () => {
                    await dispatch(fetchDoctorById(doctor.user_id));
                    setState({ ...state, doctor: selectedDoctor });
                  }}
                >
                  Book
                </Button>
              </div>
            ))
          ) : (
            <span className='mb-2 text-sm text-red opacity-50'>
              The list is out of date, please submit a new request if you want to view the available
              doctors again
            </span>
          )
        ) : (
          <></>
        )}
        {state.message.containsAppointmentsList === true &&
          message.nearest_appointments
            ?.filter(
              value => Date.parse(value.date_time.toString()) >= Date.parse(new Date().toString()),
            )
            ?.map((appointment: Appointment) => (
              <div
                key={uuid()}
                className='bg-white p-4 rounded-xl flex w-full items-center justify-between'
              >
                <div className='flex items-center'>
                  <DashboardCard
                    key={appointment.id}
                    doctor={appointment.doctor}
                    appointmentTime={appointment.date_time as Date}
                    appointmentId={appointment.id}
                    option='Dashboard'
                  />

                  <Button
                    onClick={() => {
                      console.log(`Cancel appointment with id ${appointment.id}`);
                      dispatch(
                        updateAppointment(appointment.id, {
                          ...appointment,
                          status_cd: AppointmentStatus.CANCELED,
                        }),
                      );
                      setState({
                        ...state,
                        message: { ...state.message, containsAppointmentsList: false },
                      });
                    }}
                    additionalStyle='align-self-end max-w-[100px]'
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
      </div>
      <div
        className={`flex w-full mb-4 ${message.role === 'user' ? `justify-end` : `justify-start`}`}
      >
        <div
          className={`flex max-w-[500px] rounded-xl py-5 px-4 ${
            message.role === 'user' ? `bg-white justify-end` : `bg-main text-white`
          }`}
        >
          {message.message}
        </div>
      </div>
    </>
  );
};

const VirtualAssistantTab: FC = () => {
  const [state, setState] = useState<{ messages: MessageType[] }>({ messages: [] });
  const dispatch = useAppDispatch();
  const chatMessages = useAppSelector(getAllMessages);

  useEffect(() => {
    dispatch(deleteAllMessages());
    dispatch(fetchAllMessages());
  }, []);

  useEffect(() => {
    setState(state => ({ ...state, messages: chatMessages }));
  }, [chatMessages]);

  const sendMessage = async (message: string) => {
    setState(state => ({
      ...state,
      messages: [...state.messages, { role: 'user', message } as MessageType],
    }));
    const response = await dispatch(postMessage({ role: 'user', message }));
    setState(state => ({
      ...state,
      messages: [
        ...state.messages,
        {
          role: 'assistant',
          message: response.message,
          available_doctors: response.available_doctors,
          nearest_appointments: response.nearest_appointments,
          containsDoctorsList: response.available_doctors?.length > 0,
          containsAppointmentsList: response.nearest_appointments?.length > 0,
        } as MessageType,
      ],
    }));
  };
  return (
    <div className='flex flex-col flex-grow bg-white rounded-b-xl rounded-tr-xl'>
      <div className='flex pt-6 pl-6 mb-5'>
        <div className='bg-main w-12 h-12 rounded-lg flex flex-grow-0 justify-center items-center'>
          <div className='p-auto'>
            <Icon src={icons.logo} alt='logo' />
          </div>
        </div>
        <div className='ml-3'>
          <div className='font-sans font-semibold text-lg leading-6 text-black-1'>
            Your virtual assistant
          </div>
          <div className='mt-1 font-sans text-[16px] leading-6 text-grey-1'>online</div>
        </div>
      </div>
      <div className='flex flex-col-reverse bg-bg p-10 min-h-[600px] max-h-[600px] overflow-y-auto'>
        {[...state.messages].reverse().map(message => (
          <VirtualAssistantMessage key={uuid()} message={message} />
        ))}
      </div>

      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default VirtualAssistantTab;
