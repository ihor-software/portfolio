import { FC, useState, useEffect, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import {
  fetchAllAppointments,
  getAllAppointments,
  updateAppointment,
} from 'src/store/slices/appointment.slice';
import { Appointment, AppointmentStatus } from 'src/types/appointment.types';
import { Calendar } from 'src/ui/Calendar/Calendar';
import { Button, Modal } from 'src/ui/common';
import AppointmentCard from 'src/ui/common/AppointmentCard/AppointmentCard';
import BookAppointmentModal from 'src/ui/common/BookAppointmentModal/BookAppointmentModal';
import DoctorModal from 'src/ui/common/DoctorModal/DoctorModal';
import Filter from 'src/ui/common/Filter/Filter';
import icons from 'src/ui/common/Icon/iconPaths';
import Title from 'src/ui/common/Title/Title';
import { capitalize } from 'src/utils/string-utils';
import { v4 as uuid } from 'uuid';
import HeaderPage from 'src/ui/common/HeaderPage/HeaderPage';

export type AppointmentsPageFilter = {
  name: string | number;
  selectedValue: string | number;
  values: (string | number)[];
  filter: (appointments: Appointment[], selectedValue: string | number) => Appointment[];
};

export type AppointmentsPageState = {
  visibleAppointments: Appointment[];
  filters: AppointmentsPageFilter[];
  selectedAppointment?: Appointment;
  isAppointmentModalVisible: boolean;
  isDoctorModalVisible: boolean;
  isSuccessModalVisible: boolean;
  successModalSelectedDate?: Date;
};

const intl = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  hour12: true,
  hour: 'numeric',
  minute: '2-digit',
});

const initialState: AppointmentsPageState = {
  visibleAppointments: [],
  isAppointmentModalVisible: false,
  isDoctorModalVisible: false,
  isSuccessModalVisible: false,
  filters: [
    {
      name: 'time',
      selectedValue: 'All time',
      values: ['All time', 'Yesterday', 'Last month', 'Last year', 'Future'], // Just for testing
      filter: (appointments: Appointment[], selectedValue: string | number) => {
        const result = structuredClone(appointments);
        const currentDate = new Date();
        switch (selectedValue) {
          case 'All time':
            return result;
          case 'Yesterday':
            return result.filter(
              (item: Appointment) =>
                item.date_time.getTime() >=
                  structuredClone(currentDate).setDate(
                    structuredClone(currentDate).getDate() - 1,
                  ) && item.date_time.getTime() <= structuredClone(currentDate).getTime(),
            );
          case 'Last month':
            return result.filter(
              (item: Appointment) =>
                item.date_time.getTime() >=
                  structuredClone(currentDate).setMonth(
                    structuredClone(currentDate).getMonth() - 1,
                  ) && item.date_time.getTime() <= structuredClone(currentDate).getTime(),
            );
          case 'Last year':
            return result.filter(
              (item: Appointment) =>
                item.date_time.getTime() >=
                  structuredClone(currentDate).setFullYear(
                    structuredClone(currentDate).getFullYear() - 1,
                  ) && item.date_time.getTime() <= structuredClone(currentDate).getTime(),
            );
          case 'Future':
            return result.filter(
              (item: Appointment) =>
                item.date_time.getTime() > structuredClone(currentDate).getTime(),
            );
          default:
            return result;
        }
      },
    },
    {
      name: 'statuses',
      selectedValue: 'All statuses',
      values: [
        'All statuses',
        AppointmentStatus.CANCELED,
        AppointmentStatus.PLANNED,
        AppointmentStatus.COMPLETED,
      ], // Just for testing
      filter: (appointments: Appointment[], selectedValue: string | number) => {
        const result = structuredClone(appointments);
        switch (selectedValue) {
          case 'All statuses':
            return result;
          default:
            return result.filter((item: Appointment) => item.status_cd === selectedValue);
        }
      },
    },
    {
      name: 'specialities',
      selectedValue: 'All doctors',
      values: ['All doctors'], // Just for testing
      filter: (appointments: Appointment[], selectedValue: string | number) => {
        const result = structuredClone(appointments);
        switch (selectedValue) {
          case 'All doctors':
            return result;
          default:
            return result.filter((item: Appointment) => item.doctor?.specialty === selectedValue);
        }
      },
    },
    {
      name: 'sorting',
      selectedValue: 'Latest to oldest',
      values: ['Latest to oldest', 'Oldest to latest'], // Just for testing
      filter: (appointments: Appointment[], selectedValue: string | number) => {
        const result = structuredClone(appointments);
        switch (selectedValue) {
          case 'Oldest to latest':
            return result.sort(
              (a: Appointment, b: Appointment) => a.date_time.getTime() - b.date_time.getTime(),
            );
          default:
            return result.sort(
              (a: Appointment, b: Appointment) => b.date_time.getTime() - a.date_time.getTime(),
            );
        }
      },
    },
  ],
};

const AppointmentsPage: FC = () => {
  const search = useAppSelector(state => state.searchReducer.search);
  const [state, setState] = useState(initialState);
  const [calendarDate, setCalendarDate] = useState(new Date());

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(getAllAppointments);

  useEffect(() => {
    dispatch(fetchAllAppointments());
  }, [dispatch]);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      visibleAppointments: filterAppointments(state.filters),
      filters: prevState.filters.map(filter =>
        filter.name !== 'specialities'
          ? filter
          : {
              ...filter,
              values: [
                ...filter.values,
                ...Array.from(
                  new Set(appointments.map(appointment => appointment.doctor?.specialty ?? '')),
                ),
              ],
            },
      ),
    }));
  }, [appointments]);

  const handleFilterValueChanged = (
    filter: AppointmentsPageFilter,
    selectedValue: string | number,
  ) => {
    setState(prevState => ({
      ...prevState,
      filters: prevState.filters.map(item =>
        item.name === filter.name ? { ...item, selectedValue } : item,
      ),
    }));
    setState(prevState => ({
      ...prevState,
      visibleAppointments: filterAppointments(prevState.filters),
    }));
  };

  const filterAppointments = useCallback(
    (filters: AppointmentsPageFilter[]): Appointment[] => {
      let result = structuredClone(appointments);
      filters.forEach(filter => {
        result = filter.filter(result, filter.selectedValue);
      });

      return result;
    },
    [appointments],
  );

  return (
    <main className='p-8 flex-1 max-h-screen overflow-auto'>
      <HeaderPage title='Appointments' icon={icons.appointments} />
      <section className='flex mt-5 flex-wrap xl:flex-nowrap'>
        <div className='doctors-section flex-1 w-full xl:w-auto'>
          <div className='filters flex mb-5'>
            {state.filters.map(filter => (
              <Filter
                key={uuid()}
                selectedValue={filter.selectedValue}
                values={filter.values}
                className='last:mr-0 mr-5 my-1'
                onChange={value => handleFilterValueChanged(filter, value)}
              />
            ))}
          </div>
          {state.selectedAppointment && (
            <BookAppointmentModal
              appointment={state.selectedAppointment}
              isOpened={state.isAppointmentModalVisible}
              onClose={() =>
                setState(prevState => ({
                  ...prevState,
                  isAppointmentModalVisible: false,
                  selectedAppointment: undefined,
                }))
              }
              onBook={() =>
                setState(prevState => ({
                  ...prevState,
                  isAppointmentModalVisible: false,
                  isDoctorModalVisible: true,
                }))
              }
              onCancel={() => {
                if (state.selectedAppointment) {
                  dispatch(
                    updateAppointment(state.selectedAppointment.id, {
                      ...state.selectedAppointment,
                      status_cd: AppointmentStatus.CANCELED,
                    }),
                  );
                }
                setState(prevState => ({
                  ...prevState,
                  isAppointmentModalVisible: false,
                  selectedAppointment: undefined,
                }));
              }}
            />
          )}
          {state.selectedAppointment?.doctor && (
            <DoctorModal
              doctor={state.selectedAppointment.doctor}
              isOpened={state.isDoctorModalVisible}
              onClose={() =>
                setState(prevState => ({
                  ...prevState,
                  isDoctorModalVisible: false,
                  selectedAppointment: undefined,
                }))
              }
              onBook={(date: Date) => {
                setState(prevState => ({
                  ...prevState,
                  isDoctorModalVisible: false,
                  isSuccessModalVisible: true,
                  successModalSelectedDate: date,
                }));
              }}
            />
          )}
          {state.visibleAppointments.map(appointment => (
            <AppointmentCard
              key={uuid()}
              appointment={appointment}
              onClick={event => {
                if (event.target.tagName !== 'button'.toUpperCase()) {
                  setState(prevState => ({
                    ...prevState,
                    isAppointmentModalVisible: true,
                    selectedAppointment: appointment,
                  }));
                }
              }}
              onBook={() =>
                setState(prevState => ({
                  ...prevState,
                  isDoctorModalVisible: true,
                  selectedAppointment: appointment,
                }))
              }
              onCancel={() =>
                dispatch(
                  updateAppointment(appointment.id, {
                    ...appointment,
                    status_cd: AppointmentStatus.CANCELED,
                  }),
                )
              }
              className='mb-4'
            />
          ))}
          {state.isSuccessModalVisible && (
            <SuccessModal
              isVisible={state.isSuccessModalVisible}
              onClose={() => {
                setState(prevState => ({
                  ...prevState,
                  isSuccessModalVisible: false,
                  successModalSelectedDate: undefined,
                }));
              }}
              onBookNext={() => {
                setState(prevState => ({
                  ...prevState,
                  isSuccessModalVisible: false,
                  successModalSelectedDate: undefined,
                  isDoctorModalVisible: true,
                }));
              }}
              onGoToDashboard={() => navigate('/dashboard')}
            >
              <p className='mt-4'>
                Your appointment have been scheduled on{' '}
                <span className='font-bold'>
                  {capitalize(intl.format(state.successModalSelectedDate))}
                </span>
                . You’ll receive a notification before an appointment and an invoice after.
              </p>
            </SuccessModal>
          )}
        </div>
        <aside className='calendar-section xl:ml-6 w-full xl:w-auto'>
          <Calendar value={calendarDate} onChange={setCalendarDate} />
        </aside>
      </section>
    </main>
  );
};

export default AppointmentsPage;

type SuccessModalProps = {
  isVisible: boolean;
  children?: ReactNode | ReactNode[];
  onClose?: (...args: any[]) => void;
  onGoToDashboard?: (...args: any[]) => void;
  onBookNext?: (...args: any[]) => void;
};

const SuccessModal: FC<SuccessModalProps> = ({
  isVisible,
  children,
  onClose,
  onBookNext,
  onGoToDashboard,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isVisible} className='max-w-[600px]'>
      <Title title={'Success!'} />
      {children}
      <div className='flex buttons-container mt-8'>
        <Button variant='secondary' onClick={onBookNext}>
          Book next appointment
        </Button>
        <Button additionalStyle='ml-4' onClick={onGoToDashboard}>
          Go to dashboard
        </Button>
      </div>
    </Modal>
  );
};
