import { FC } from 'react';

import doctorAvatarMock from '../../../images/doctor.svg';
import { Patient } from 'src/types/patient.types';
import { formatDate, formatTime } from 'src/utils/formats';
import icons from 'src/ui/common/Icon/iconPaths';

import { useNavigate } from 'react-router-dom';

type PatientDashboardCardProps = {
  appointmentTime?: Date;
  patient: Patient | undefined;
  option: 'Dashboard' | 'Calendar';
  appointmentId?: number | undefined;
  onClick?: () => void;
  className?: string;
  isJoinable?: boolean;
};

const PatientDashboardCard: FC<PatientDashboardCardProps> = ({
  appointmentTime,
  patient,
  option,
  appointmentId,
  onClick,
  className,
  isJoinable = false,
}) => {
  const navigate = useNavigate();

  function handleJoinAppointment() {
    navigate(`/conference/${appointmentId}`);
  }

  return (
    <div
      className={'bg-bg flex flex-col lg:flex-row py-2 px-4 rounded-xl gap-4 ' + className}
      onClick={onClick}
    >
      <div className='flex gap-4'>
        <div className='flex flex-row w-[300px] gap-4'>
          <img
            src={patient?.user?.avatar ?? icons.account}
            alt='patient image'
            className='rounded-lg w-12 h-12 object-cover'
          />
          <div className='flex flex-col justify-between'>
            <p className='text-base'>
              {console.log(patient)}
              {patient?.user?.first_name} {patient?.user?.last_name}
            </p>
          </div>
        </div>

        {option === 'Dashboard' && appointmentTime && (
          <>
            <div className='w-px bg-main-medium'></div>
            <div className='flex items-center gap-5'>
              <p className='text-sm w-[50px]'>{formatDate(appointmentTime)}</p>
              <div className='w-px bg-main-medium h-6'></div>
              <img src={icons.timer} alt='timer' />
              <p className='text-sm text-black-2'>{formatTime(appointmentTime)}</p>
              {isJoinable && (
                <button
                  onClick={handleJoinAppointment}
                  className='bg-main rounded-lg text-white py-1 px-4'
                >
                  Join
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientDashboardCard;
