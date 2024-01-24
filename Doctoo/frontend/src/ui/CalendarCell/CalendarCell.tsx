import { FC } from 'react';
import Tag from '../common/Tag/Tag';
import styles from './CalendarCell.module.css';

type CalendarCellProps = {
  day: number;
  isDisabled: boolean;
  isToday: boolean;
  doctor_lastname?: string;
  callsCount?: number;
  onClick?: () => void;
  className?: string;
};

const CalendarCell: FC<CalendarCellProps> = ({
  day,
  isDisabled,
  isToday,
  doctor_lastname = '',
  callsCount,
  onClick,
  className,
}) => {
  return (
    <div className={`${styles.cell} ${className}`} onClick={onClick}>
      <div className='flex justify-end'>
        <div className={`${styles.day} ` + (isToday ? 'bg-main' : 'bg-white')}>
          <p className={isToday ? 'text-white' : isDisabled ? 'text-grey-3' : 'text-black'}>
            {day}
          </p>
        </div>
      </div>
      <div className='m-2 flex'>
        {(callsCount || doctor_lastname) && (
          <Tag
            text={callsCount || doctor_lastname.length > 7 ? 'Calls' : 'Dr. ' + doctor_lastname}
            additionalClasses={['grow', 'flex', 'justify-between']}
            textColor={styles.blacktext}
            additionalElement={
              (callsCount || doctor_lastname.length > 7) && (
                <div className={`${styles.callscount}`}>
                  <p>{callsCount ? callsCount : 1}</p>
                </div>
              )
            }
          ></Tag>
        )}
      </div>
    </div>
  );
};

export default CalendarCell;
