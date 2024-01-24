import { FC, useState } from 'react';
import { Notification } from 'src/types/notification.types';
import { Icon, Input, Modal } from 'src/ui/common';
import { NotificationCard } from './NotificationCard';
import icons from 'src/ui/common/Icon/iconPaths';
import Pagination from 'src/ui/Pagination/Pagination';

type NotificationModalProps = {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
};

const NotificationModal: FC<NotificationModalProps> = ({ notifications, isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState('From recent to latest');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const options = ['From recent to latest', 'From latest to recent'];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const sortedNotifications = notifications
    .map(notifications => notifications)
    .sort(
      selectedOption !== 'From recent to latest'
        ? (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
        : (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );

  const filteredNotifications = sortedNotifications.filter(
    (value, index) => index >= 3 * (currentPage - 1) && index < 3 * currentPage,
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} className='w-[588px]'>
      <h3 className='text-2xl mb-8'>Notifications</h3>
      <Input label={''} value={undefined} placeholder='Search' />
      <div
        className='flex justify-end items-center mt-4 text-black-2 relative cursor-pointer'
        onClick={toggleDropdown}
      >
        {selectedOption}
        <Icon src={icons.shevronMiniClosed} alt='shevron' />
        {isDropdownOpen ? (
          <div className='absolute top-full bg-bg rounded-md'>
            {options.map((option, index) => (
              <p
                key={index}
                className='px-3 py-2 hover:bg-grey-4 rounded-md'
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </p>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      {filteredNotifications.map(notification => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
      {notifications.length > 3 && (
        <Pagination
          currentPage={currentPage}
          totalPages={
            notifications.length % 3 === 0 ? notifications.length / 3 : notifications.length / 3 + 1
          }
          onPageChange={onPageChange}
        />
      )}
    </Modal>
  );
};

export default NotificationModal;
