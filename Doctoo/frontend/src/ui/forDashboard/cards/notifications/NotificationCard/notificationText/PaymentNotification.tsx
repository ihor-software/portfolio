import { FC } from 'react';
import { Notification } from 'src/types/notification.types';

type NotificationTextProps = {
  notification: Notification;
};

export const PaymentNotification: FC<NotificationTextProps> = ({ notification }) => {
  return (
    <>
      {notification.appointment ? (
        notification.appointment.is_paid ? (
          <p>Successful payment</p>
        ) : (
          <p>
            You received an invoice for your appointment with Dr.{' '}
            {notification.appointment.doctor.first_name} {notification.appointment.doctor.last_name}{' '}
            for $ {notification.appointment.doctor?.payrate}.00
          </p>
        )
      ) : (
        <p></p>
      )}
    </>
  );
};
