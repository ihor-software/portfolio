import { FC, useEffect, useState } from 'react';
import { Icon } from 'src/ui/common/Icon';
import icons from 'src/ui/common/Icon/iconPaths';
import { SectionPlaceholder } from 'src/ui/forDashboard/placeholders';
import styles from './DashboardPage.module.css';
import PatientDashboardCard from 'src/ui/forDashboard/cards/PatientDashboardCard';
import { useAppSelector } from 'src/hooks/redux';
import { appointmentAsyncActions } from 'src/store/slices/appointmentSlice';
import { getAllAppointments, getUpcomingAppointments } from 'src/store/slices/appointment.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUniqueDoctors } from 'src/utils/appointmentSlice';

const DashboardDoctorPage: FC = () => {
  const dispatch = useDispatch();
  const loading = false;
  const appointments = useAppSelector(getAllAppointments);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUpcomingAppointments());
  }, []);

  const id = useAppSelector(state => state.auth.currentUser?.id);

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.titlesection}>
          <Icon src={icons.dashboard} alt='dashboard' iconColor='main' />
          <h2 className={styles.title}>Dashboard</h2>
        </div>
      </div>
      <div className='grid gap-4 grid-cols-[2fr,1fr] grid-rows-2'>
        <div className='p-6 bg-white rounded-xl flex gap-5 flex-col'>
          {loading ? (
            <SectionPlaceholder cardsCount={3} />
          ) : (
            <>
              <h3 className='text-lg'>Nearest appointments</h3>
              <div className='flex gap-3 flex-col'>
                {console.log(appointments[0])}
                {appointments.map(appointment => (
                  <PatientDashboardCard
                    key={appointment.id}
                    patient={appointment.patient}
                    appointmentTime={appointment.date_time}
                    appointmentId={appointment.id}
                    isJoinable={true}
                    option='Dashboard'
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardDoctorPage;
