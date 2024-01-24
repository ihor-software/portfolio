import { FC, useEffect, useState } from 'react';
import { Icon } from 'src/ui/common/Icon';
import { Notification } from 'src/types/notification.types';
import { NotificationText } from './notificationText/NotificationText';
import { formatTimeAgo, selectIcon } from 'src/utils/notificationUtils';
import { Button } from 'src/ui/common/Button';
import styles from '../Notification.module.css';
import { NavLink } from 'react-router-dom';

type NotificationCardProps = {
  notification: Notification;
};

const NotificationCard: FC<NotificationCardProps> = ({ notification }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const time = formatTimeAgo(notification.createdAt, currentTime);

  return (
    <div className={styles.card}>
      <div className='flex gap-3'>
        <Icon src={selectIcon(notification)} alt='notification icon' />
        <div className='flex flex-col gap-2 justify-end'>
          <NotificationText notification={notification} />
          <p className='text-sm text-grey-2'>{time}</p>
        </div>
      </div>
      {notification.type === 'payment' && !notification.appointment?.is_paid && (
        <Button variant='secondary'>
          <NavLink to={`/payment/${notification?.appointment?.id}`}>Confirm and pay</NavLink>{' '}
        </Button>
      )}
    </div>
  );
};

export default NotificationCard;
