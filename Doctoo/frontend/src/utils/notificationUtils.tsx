import { Notification } from 'src/types/notification.types';
import icons from 'src/ui/common/Icon/iconPaths';

const selectIcon = (notification: Notification) => {
  switch (notification.type) {
    case 'appointment':
      return icons.healthcare;
    case 'payment':
      return notification.appointment
        ? notification.appointment.is_paid
          ? icons.billApproval
          : icons.sendInvoice
        : icons.emptyIcon;
    default:
      return icons.emptyIcon;
  }
};

const formatTimeAgo = (date: Date, now: Date) => {
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) {
    return `${diff} seconds ago`;
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} minutes ago`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hours ago`;
  } else {
    const day = date.getDate();
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }
};

export { selectIcon, formatTimeAgo };
