import { FC, useCallback } from 'react';
import { Modal } from '../Modal';
import Title from '../Title/Title';
import { Icon } from '../Icon';
import icons from '../Icon/iconPaths';
import styles from './BookAppointmentModal.module.css';
import Tag, { TagTextType } from '../Tag/Tag';
import { Button } from '../Button';
import { Appointment, AppointmentStatus } from 'src/types/appointment.types';
import { capitalize } from '../../../utils/string-utils';
import Rating from '../Rating/Rating';
import { v4 as uuid } from 'uuid';
import doctorAvatarMock from '../../../images/doctor.svg';

type BookAppointmentModalProps = {
  appointment: Appointment;
  isOpened?: boolean;
  onClose?: (...args: any[]) => void;
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

const BookAppointmentModal: FC<BookAppointmentModalProps> = ({
  appointment,
  onClose,
  onBook,
  onCancel,
  isOpened = true,
}) => {
  const getAppointmentTagVariantByStatus = useCallback(
    (status: AppointmentStatus) => {
      switch (status) {
        case AppointmentStatus.CANCELED:
          return TagTextType.Error;
        case AppointmentStatus.PLANNED:
          return TagTextType.Info;
        case AppointmentStatus.COMPLETED:
          return TagTextType.Primary;
      }
    },
    [appointment.status_cd],
  );

  return (
    <Modal onClose={onClose} className={styles.modalWrapper} isOpen={isOpened}>
      <Title
        title={capitalize(intl.format(appointment.date_time).toLocaleLowerCase())}
        titleIcon={
          <Icon
            src={icons.date}
            alt={'Appointment date'}
            iconColor='main'
            className={styles.titleIcon}
          />
        }
        titleFontWeight='bold'
        titleFontSize={20}
      >
        <Tag
          text={appointment.status_cd}
          variant={getAppointmentTagVariantByStatus(appointment.status_cd)}
        />
      </Title>
      <section className='flex mt-4'>
        <div className='image-container'>
          <div className='rounded-xl bg-bg w-[112px] h-[112px] flex justify-center items-center'>
            <img
              src={appointment.doctor?.user.avatar ?? doctorAvatarMock}
              alt='doctor image'
              className='rounded-lg w-full h-full object-cover'
            />
          </div>
        </div>
        <div className='doctor-info-container ml-6'>
          <h3 className='text-xl font-medium'>
            Appointment with{' '}
            <span className='text-main cursor-pointer'>
              Dr. {appointment.doctor?.user?.first_name} {appointment.doctor?.user?.last_name}
            </span>
          </h3>
          <p className='text-grey-2 text-lg mt-1'>{capitalize(appointment.doctor?.specialty)}</p>
          {appointment.doctor?.top_doctor && (
            <Tag text='Top doctor' variant={TagTextType.Primary} additionalClasses={['mt-3']} />
          )}
          <Rating rating={appointment.doctor?.rating ?? 0} className='flex align-center mt-4'>
            <span className='ml-4 underline'>
              {appointment.doctor?.reviews?.length ?? 0} reviews
            </span>
          </Rating>
        </div>
      </section>
      {(appointment.attached_files.length ?? 0) > 0 && (
        <section className='attached-files flex justify-between mt-4'>
          <span className='text-grey whitespace-nowrap mr-10'>Attached files:</span>
          <div className='attached-files-names-container'>
            {appointment.attached_files.map(file => (
              // May be replaced by download link
              <span key={uuid()} className='cursor-pointer text-black underline ml-2 first:ml-0'>
                <a href={file.link}>{file.type}</a>
              </span>
            ))}
          </div>
        </section>
      )}
      <footer className='flex justify-end mt-8'>
        {appointment.status_cd === AppointmentStatus.PLANNED && (
          <Button
            additionalStyle='!border-red-2 !text-red-2 hover:!border-red hover:!text-red !min-w-[220px]'
            variant='secondary'
            onClick={onCancel}
          >
            Cancel appointment
          </Button>
        )}
        <Button additionalStyle='ml-2' onClick={onBook}>
          Book again
        </Button>
      </footer>
    </Modal>
  );
};

export default BookAppointmentModal;
