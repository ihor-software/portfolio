import { FC, useCallback } from 'react';
import { Icon } from '../Icon/Icon';
import icons from '../Icon/iconPaths';
import Button from '../Button/Button';
import { capitalize } from '../../../utils/string-utils';
import styles from './AppointmentCard.module.css';
import Tag, { TagTextType } from '../Tag/Tag';
import { Appointment, AppointmentStatus } from 'src/types/appointment.types';
import { useNavigate } from 'react-router-dom';

type AppointmentCardProps = {
  appointment: Appointment;
  className?: string;
  onClick?: (...args: any[]) => void;
  onBook?: (...args: any[]) => void;
  onCancel?: (...args: any[]) => void;
};

const intl = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  hour12: true,
  hour: 'numeric',
  minute: '2-digit',
});

const AppointmentCard: FC<AppointmentCardProps> = ({
  appointment,
  className = '',
  onClick,
  onBook,
  onCancel,
}) => {
  const navigate = useNavigate();
  const getAppointmentCardTagVariant = useCallback((status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.CANCELED:
        return TagTextType.Error;
      case AppointmentStatus.PLANNED:
        return TagTextType.Info;
      case AppointmentStatus.COMPLETED:
        return TagTextType.Primary;
    }
  }, []);

  return (
    <div
      className={`appointment-card bg-white cursor-pointer rounded-xl p-5 ${styles['font-inter']} ${className}`}
      onClick={onClick}
    >
      <header className='appointment-card-header flex justify-between'>
        <div className='flex-column mr-5 max-w-[485px]'>
          <div className='flex pb-1'>
            <div className='icon-container w-full max-w-[24px]'>
              <Icon src={icons.date} alt='appointment date' iconColor='main' />
            </div>
            <span className='font-bold ml-2 text-lg'>
              {capitalize(intl.format(appointment.date_time).toLocaleLowerCase())}
            </span>
          </div>
          <span className='font-medium'>
            Dr. {appointment.doctor?.user?.first_name} {appointment.doctor?.user?.last_name} (
            {appointment.doctor?.specialty})
          </span>
        </div>
        <div className='flex flex-col gap-5 items-end'>
          {appointment.status_cd === AppointmentStatus.PLANNED ? (
            <Button
              variant='secondary'
              onClick={onCancel}
              additionalStyle='!text-red-2 !border-red-2 hover:!text-red hover:!border-red'
            >
              Cancel
            </Button>
          ) : (
            <Button variant='secondary' onClick={onBook}>
              Book again
            </Button>
          )}
          {!appointment.is_paid && appointment.status_cd !== AppointmentStatus.CANCELED && (
            <Button variant='secondary' onClick={() => navigate(`/payment/${appointment?.id}`)}>
              <Icon src={icons.creditCard} alt='pay' /> Pay
            </Button>
          )}
        </div>
      </header>
      <div className='appointment-card-tag mt-3 flex justify-start'>
        <Tag
          text={appointment.status_cd}
          variant={getAppointmentCardTagVariant(appointment.status_cd)}
        />
      </div>
      {(appointment.attached_files.length ?? 0) > 0 && (
        <div className='appointment-card-attached-files flex justify-between mt-3'>
          <span className='text-grey'>Attached files:</span>
          <span className='text-black underline'>
            {appointment.attached_files.map(file => file.type)}
          </span>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
