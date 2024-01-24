import { FC, useEffect, useState } from 'react';
import { Notification } from 'src/types/notification.types';

type NotificationTextProps = {
  notification: Notification;
};

export const AppointmentNotification: FC<NotificationTextProps> = ({ notification }) => {
  const currentDate = new Date();
  const [remainingMinutes, setRemainingMinutes] = useState(
    notification.appointment
      ? Math.round(
          (notification.appointment.date_time.getTime() - currentDate.getTime()) / (1000 * 60),
        )
      : null,
  );
  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingMinutes = Math.round(
        notification.appointment
          ? (notification.appointment.date_time.getTime() - new Date().getTime()) / (1000 * 60)
          : 0,
      );
      if (newRemainingMinutes <= 0) {
        clearInterval(interval);
      } else {
        setRemainingMinutes(newRemainingMinutes);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {notification.appointment ? (
        notification.appointment.date_time < currentDate ? (
          notification.appointment.is_visited ? (
            <p>
              Successful appointment with Dr. {notification.appointment.doctor.first_name}{' '}
              {notification.appointment.doctor.last_name}{' '}
            </p>
          ) : (
            <p>
              Skipped appointment with Dr. {notification.appointment.doctor.first_name}{' '}
              {notification.appointment.doctor.last_name}
            </p>
          )
        ) : (
          <p>
            Your appointment with Dr. {notification.appointment.doctor.first_name}{' '}
            {notification.appointment.doctor.last_name} starts in {remainingMinutes} minutes
          </p>
        )
      ) : (
        <p></p>
      )}
    </>
  );
};
