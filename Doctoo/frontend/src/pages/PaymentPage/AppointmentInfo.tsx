import { Icon } from 'src/ui/common/Icon';
import icons from 'src/ui/common/Icon/iconPaths';
import { capitalize } from 'src/utils/string-utils';
import Tag from 'src/ui/common/Tag/Tag';

interface AppointmentInfoProps {
  appointment: any;
  className?: string;
}

const intl = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  hour12: true,
  hour: 'numeric',
  minute: '2-digit',
});

export function AppointmentInfo({ appointment, className }: AppointmentInfoProps) {
  return (
    <div className={className}>
      <div className='flex pb-1'>
        <div className='icon-container w-full max-w-[24px]'>
          <Icon src={icons.date} alt='appointment date' iconColor='main' />
        </div>

        <span className='ml-2 text-lg font-bold'>
          {capitalize(intl.format(new Date(appointment.date_time)).toLocaleLowerCase())}
        </span>
      </div>
      <span className='font-medium'>
        Dr. {appointment.doctor?.user?.first_name} {appointment.doctor?.user?.last_name} (
        {appointment.doctor?.specialty?.specialty})
      </span>

      <div className='flex justify-start mt-3 appointment-card-tag'>
        <Tag text={appointment.status_cd} />
      </div>
    </div>
  );
}
