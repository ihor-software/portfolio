import { NotificationCard } from '../cards/notifications/NotificationCard';
import { useAppSelector } from 'src/hooks/redux';
import { SectionPlaceholder } from '../placeholders';
import { useNotificationSocket } from 'src/hooks/notifications';
import { useState } from 'react';
import NotificationModal from '../cards/notifications/NotificationModal';
import { Notification } from 'src/types/notification.types';

export const NotificationSection = () => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const notifications: Notification[] = useAppSelector(
    state => state.notificationReducer.notifications,
  );
  const loading = useAppSelector(state => state.notificationReducer.loading);
  const id = useAppSelector(state => state.auth.currentUser?.id);

  useNotificationSocket(id ? id : 0);

  return (
    <>
      {loading ? (
        <SectionPlaceholder cardsCount={3} />
      ) : (
        <>
          <div className='flex justify-between'>
            <h3 className='text-lg'>Notifications</h3>
            {notifications.length > 3 && (
              <p
                className='bg-bg px-4 py-1 text-sm text-black-2 rounded-2xl cursor-pointer'
                onClick={() => setModalVisible(true)}
              >
                View all
              </p>
            )}
          </div>
          {notifications.length !== 0 ? (
            <>
              {notifications
                .filter((value, index) => index <= 2)
                .map(notification => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
            </>
          ) : (
            <p className='text-black-2 text-base text-center mt-10'>
              You don’t have any notifications yet
            </p>
          )}
        </>
      )}
      {isModalVisible && (
        <NotificationModal
          notifications={notifications}
          isOpen={isModalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </>
  );
};
