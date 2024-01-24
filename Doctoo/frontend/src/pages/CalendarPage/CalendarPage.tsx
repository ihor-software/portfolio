import { FC, useEffect, useState } from 'react';
import CalendarCell from 'src/ui/CalendarCell/CalendarCell';
import { Button } from 'src/ui/common/Button';
import Header from 'src/ui/common/Header/Header';
import { Icon } from 'src/ui/common/Icon';
import icons from 'src/ui/common/Icon/iconPaths';
import { CardPlaceholder } from 'src/ui/forDashboard/placeholders/card-placeholder';
import { addDates, compareDays, getDaysInMonth } from 'src/utils/calendarUtil';
import './CalendarPage.module.css';
import { useAppSelector } from 'src/hooks/redux';
import { useDispatch } from 'react-redux';
import DashboardCard from 'src/ui/forDashboard/cards/DashboardCard';
import { formatDate } from 'src/utils/formats';
import { Appointment } from 'src/types/appointment.types';
import BookAppointmentModal from 'src/ui/common/BookAppointmentModal/BookAppointmentModal';
import { Doctor } from 'src/types/doctor.types';
import DoctorModal from 'src/ui/common/DoctorModal/DoctorModal';
import { fetchAllAppointments, getAllAppointments } from 'src/store/slices/appointment.slice';
import { NavLink } from 'react-router-dom';
import { ROUTES } from 'src/utils/routes';

const CalendarPage: FC = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ currentMonth: new Date(), date: new Date() });
  const currentDate: Date = new Date();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();

  const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const datesPerPage = addDates(
    getDaysInMonth(state.currentMonth.getFullYear(), state.currentMonth.getMonth()),
  );

  const loading = false;
  const appointments = useAppSelector(getAllAppointments);
  // useAppSelector(state =>
  //   state.appointmentReducer.appointments
  //     .filter(value => new Date() <= value.date_time)
  //     .filter((value, index) => index <= 2),
  // );

  const id = useAppSelector(state => state.auth.currentUser?.id);

  useEffect(() => {
    dispatch(fetchAllAppointments()); // Fetch all appointmets from db to redux store
  }, []);

  const getAppointmentsByDay = (day: Date) => {
    return appointments.filter(
      appointment =>
        appointment.date_time.getFullYear() === day.getFullYear() &&
        appointment.date_time.getMonth() === day.getMonth() &&
        appointment.date_time.getDate() === day.getDate() &&
        appointment.status_cd !== 'Canceled',
    );
  };

  const showedAppointments = appointments
    .filter(
      appointment =>
        compareDays(appointment.date_time, state.date) && appointment.status_cd !== 'Canceled',
    )
    .map(appointment => (
      <DashboardCard
        key={appointment.id}
        doctor={appointment.doctor}
        appointmentTime={appointment.date_time}
        option='Calendar'
        onClick={() => setSelectedAppointment(appointment)}
        className='cursor-pointer gap-0'
      />
    ));

  return (
    <>
      <div className='grow h-full p-8 font-medium max-h-screen overflow-auto'>
        <div className='flex justify-between flex-row'>
          <div className='flex items-center gap-3 mb-6'>
            <Icon src={icons.date} alt='calendar' iconColor='main' />
            <h2 className='text-2xl leading-9 text-black-1'>Calendar</h2>
          </div>
          <div className='flex gap-x-4 flex-row'>
            <NavLink to={ROUTES.SEARCH}>
              <Button variant='main' onClick={() => {}} additionalStyle='w-52'>
                Find a doctor
              </Button>
            </NavLink>
          </div>
        </div>
        <div className='flex gap-8 items-start'>
          <div
            className={`bg-white rounded-xl p-6 basis-2/3 ${
              showedAppointments.length === 0 ? 'h-[308px]' : ''
            }`}
          >
            <h3 className='text-lg mb-5'>
              {compareDays(state.date, currentDate)
                ? "Today's appointments"
                : formatDate(state.date)}
            </h3>
            <div className='flex flex-col gap-3'>
              {loading ? (
                <CardPlaceholder />
              ) : (
                <>
                  {showedAppointments.length === 0 ? (
                    <p className='text-grey-1 text-sm font-normal leading-5'>
                      No appointments for this date. Try to book one or select another day
                    </p>
                  ) : (
                    showedAppointments
                  )}
                </>
              )}
            </div>
          </div>
          <div className='flex-shrink-0'>
            <div className='w-60 pb-4'>
              <Header
                date={state.currentMonth}
                setDate={date => setState({ ...state, currentMonth: date })}
              />
            </div>
            <div className='flex flex-col gap-4'>
              <div className='grid grid-cols-7'>
                {week.map((day, index) => (
                  <div key={index} className='w-28'>
                    <p className='text-end text-grey-3'>{day.toUpperCase()}</p>
                  </div>
                ))}
              </div>
              <div className='overflow-y-auto h-[calc(100vh-100px)] scrollbar-hide no-scrollbar'>
                <div className='grid grid-cols-7 grid-rows-6 gap-4 overflow-y-auto overscroll-none pr-2'>
                  {datesPerPage.map((day, index) => (
                    <CalendarCell
                      key={index}
                      day={day.getDate()}
                      isDisabled={day.getMonth() !== state.currentMonth.getMonth()}
                      isToday={compareDays(currentDate, day)}
                      doctor_lastname={
                        getAppointmentsByDay(day).length === 1
                          ? getAppointmentsByDay(day)[0].doctor?.user?.last_name
                          : undefined
                      }
                      callsCount={
                        getAppointmentsByDay(day).length === 1
                          ? undefined
                          : getAppointmentsByDay(day).length
                      }
                      onClick={() => setState({ ...state, date: day })}
                      className={compareDays(state.date, day) ? 'border border-main' : ''}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedAppointment && (
        <BookAppointmentModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(undefined)}
          onBook={() => {
            setSelectedAppointment(undefined);
            setSelectedDoctor(selectedAppointment.doctor);
          }}
        />
      )}
      {selectedDoctor && (
        <DoctorModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(undefined)} />
      )}
    </>
  );
};

export default CalendarPage;
