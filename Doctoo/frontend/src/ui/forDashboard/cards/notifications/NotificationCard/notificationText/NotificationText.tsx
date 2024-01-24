import { FC } from 'react';
import { Notification } from 'src/types/notification.types';
import { AppointmentNotification } from './AppointmentNotification';
import { PaymentNotification } from './PaymentNotification';

type NotificationTextProps = {
  notification: Notification;
};

export const NotificationText: FC<NotificationTextProps> = ({ notification }) => {
  switch (notification.type) {
    case 'appointment':
      return <AppointmentNotification notification={notification} />;
    case 'payment':
      return <PaymentNotification notification={notification} />;
    default:
      return <></>;
  }
};
