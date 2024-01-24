import { FC, useEffect, useState } from 'react';
import { SectionPlaceholder } from 'src/ui/forDashboard/placeholders';
import { NotificationSection } from 'src/ui/forDashboard/sections/NotificationSection';
import styles from './DashboardPage.module.css';
import DashboardCard from 'src/ui/forDashboard/cards/DashboardCard';
import { useAppSelector } from 'src/hooks/redux';
import { useDispatch } from 'react-redux';
import { Calendar } from 'src/ui/Calendar/Calendar';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAllAppointments, getUpcomingAppointments } from 'src/store/slices/appointment.slice';
import { Doctor } from 'src/types/doctor.types';
import { getUniqueDoctors } from 'src/utils/appointmentSlice';
import HeaderPage from 'src/ui/common/HeaderPage/HeaderPage';
import icons from 'src/ui/common/Icon/iconPaths';
import { Button } from 'src/ui/common';

const DashboardPage: FC = () => {
  const dispatch = useDispatch();
  const [savedDoctors, setSavedDoctors] = useState<Doctor[]>([]);
  const loading = false;
  const appointments = useAppSelector(getAllAppointments);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUpcomingAppointments());
    setSavedDoctors(getUniqueDoctors(appointments));
  }, []);

  useEffect(() => {
    setSavedDoctors(getUniqueDoctors(appointments));
  }, [appointments]);

  const [date, setDate] = useState(new Date());

  const filteredAppointments = appointments
    .map(e => e)
    .sort((a, b) => {
      return a.date_time.getTime() - b.date_time.getTime();
    })
    .filter(value => value.date_time >= new Date() && value.status_cd !== 'Canceled')
    .filter((value, index) => index <= 2)
    .map(appointment => (
      <DashboardCard
        key={appointment.id}
        doctor={appointment.doctor}
        appointmentTime={appointment.date_time}
        appointmentId={appointment.id}
        option='Dashboard'
      />
    ));

  return (
    <div className={styles.content + ' max-h-screen overflow-auto'}>
      <HeaderPage title='Dashboard' icon={icons.dashboard} />
      <div className='flex gap-6'>
        <div className='flex flex-col gap-6 grow'>
          <div className='p-6 bg-white rounded-xl flex gap-5 flex-col basis-1/2'>
            {loading ? (
              <SectionPlaceholder cardsCount={3} />
            ) : (
              <>
                <h3 className='text-lg'>Nearest appointments</h3>
                <div className='flex gap-3 flex-col h-full'>
                  {appointments.length ? (
                    appointments.map(appointment => (
                      <DashboardCard
                        key={appointment.id}
                        doctor={appointment.doctor}
                        appointmentTime={appointment.date_time}
                        appointmentId={appointment.id}
                        isJoinable={true}
                        option='Dashboard'
                      />
                    ))
                  ) : (
                    <div className='h-full w-full flex flex-col gap-4 items-center justify-center text-black-2'>
                      <p>You don`t have any appointments yet</p>
                      <Button onClick={() => navigate('/search')}>Book now</Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className='p-6 bg-white rounded-xl grow'>
            <NotificationSection />
          </div>
        </div>
        <div className='flex gap-6 flex-col'>
          <Calendar value={date} onChange={setDate} />
          <div className='p-6 bg-white rounded-xl flex-2'>
            {!loading ? (
              <>
                <div className='flex justify-between mb-5'>
                  <h3 className='text-lg'>My Doctors</h3>
                  <button className='bg-bg px-4 py-1 text-sm text-black-2 rounded-2xl'>
                    <NavLink to={'/my-doctors'}>View all ({savedDoctors.length}) -&gt;</NavLink>
                  </button>
                </div>
                <div className='flex flex-col gap-2'>
                  {savedDoctors.length ? (
                    savedDoctors
                      .filter((value, index) => index <= 1)
                      .map(doctor => (
                        <DashboardCard key={doctor.user_id} doctor={doctor} option='Dashboard' />
                      ))
                  ) : (
                    <p className='text-black-2 text-sm text-center'>
                      Will appear here after an appointment
                    </p>
                  )}
                </div>
              </>
            ) : (
              <SectionPlaceholder cardsCount={2} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
