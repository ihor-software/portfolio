import { FC, ReactNode, useState } from 'react';
import { Doctor } from 'src/types/doctor.types';
import { Modal } from '../Modal';
import Title from '../Title/Title';
import { capitalize } from 'src/utils/string-utils';
import Rating from '../Rating/Rating';
import { Review } from 'src/types/review.type';
import styles from './DoctorModal.module.css';
import DoctorAppointmentsPicker from '../DoctorAppointmentsPicker/DoctorAppointmentsPicker';
import { Icon } from '../Icon';
import icons from '../Icon/iconPaths';
import { Button } from '../Button';
import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { createAppointment } from 'src/store/slices/appointment.slice';
import { AppointmentStatus } from 'src/types/appointment.types';
import { setMessage } from 'src/store/slices/systemMessage.slice';
import doctorAvatarMock from '../../../images/doctor.svg';

export type DoctorModalProps = {
  doctor: Doctor | undefined | null;
  isOpened?: boolean;
  onClose: (...args: any[]) => void;
  onBook?: (...args: any[]) => void;
};

export type DoctorModalState = {
  selectedAppointmentDatetime?: Date;
};

export type DoctorReviewProps = {
  review: Review;
  className?: string;
};

type DoctorModalSectionProps = {
  heading: string;
  children?: ReactNode | ReactNode[];
  className?: string;
};

const DoctorModalSection: FC<DoctorModalSectionProps> = ({ heading, children, className = '' }) => {
  return (
    <section className={`doctor-modal-section pt-4 ${className}`}>
      <h3 className='font-bold text-lg my-3'>{heading}</h3>
      {children}
    </section>
  );
};

export const DoctorReview: FC<DoctorReviewProps> = ({ review, className = '' }) => {
  return (
    <div className={`testimonial bg-bg rounded-xl p-5 mb-4 last:mb-0 ${className}`}>
      <Rating rating={review.rating} />
      <p className='my-3'>{review.text}</p>
      <h4 className='font-bold'>
        {review.author.user?.first_name} {review.author.user?.last_name}
      </h4>
    </div>
  );
};

const DoctorModal: FC<DoctorModalProps> = ({ doctor, onClose, onBook, isOpened = true }) => {
  const [state, setState] = useState<DoctorModalState>({});
  const dispatch = useAppDispatch();
  const authenticatedUser = useAppSelector(state => state.auth.currentUser);

  const handleBookAppointment = () => {
    try {
      dispatch(
        createAppointment({
          date_time: state.selectedAppointmentDatetime,
          patient_id: authenticatedUser?.id,
          doctor_id: doctor?.user_id,
          status_cd: AppointmentStatus.PLANNED,
          rating: 0,
          is_notified_pay: true,
          is_notified_time: true,
        }),
      );

      onBook?.(state.selectedAppointmentDatetime);
      setState({ ...state, selectedAppointmentDatetime: undefined });
      onClose([]);
      dispatch(
        setMessage({
          message: 'Your appointment is successfully booked!',
          status: 'success',
        }),
      );
    } catch (error: any) {
      dispatch(
        setMessage({
          message: error.message || 'Some error occurred, try again later!',
          status: 'error',
        }),
      );
    }
  };

  return (
    <Modal className={styles.modalWrapper} onClose={onClose} isOpen={isOpened}>
      <header className='flex'>
        <div className='image-container'>
          <div className='rounded-xl bg-bg w-[112px] h-[112px] flex justify-center items-center'>
            <img
              src={doctor?.user.avatar ?? doctorAvatarMock}
              alt='doctor image'
              className='rounded-lg w-full h-full object-cover'
            />
          </div>
        </div>
        <div className='doctor-info-container ml-6 flex-1'>
          <Title
            title={`Dr. ${doctor?.user?.first_name} ${doctor?.user?.last_name}`}
            titleFontSize={24}
            titleFontWeight='bold'
          >
            <div className='doctor-payrate'>
              <span className='price text-main font-bold text-2xl'>${doctor?.payrate}</span>
              <span className='text-grey-1 ml-1'> / visit</span>
            </div>
          </Title>
          <p className='mt-1 text-grey-1 text-lg'>
            {capitalize(doctor ? doctor.specialty : undefined)}
          </p>
          <Rating rating={doctor ? doctor.rating : 0} className='mt-2 flex'>
            <span className='ml-4 underline'>{doctor?.reviews.length} reviews</span>
          </Rating>
        </div>
      </header>
      <DoctorAppointmentsPicker
        doctor={doctor}
        onChange={(datetime: Date) => setState({ ...state, selectedAppointmentDatetime: datetime })}
      />
      <div className='w-full flex justify-center mt-8'>
        <div className='w-10/12 bg-bg'>
          <Button
            additionalStyle='w-full'
            onClick={handleBookAppointment}
            disabled={!state.selectedAppointmentDatetime}
          >
            Book appointment
          </Button>
        </div>
      </div>
      <DoctorModalSection heading='About me'>
        <p className='text-justify'>{doctor?.bio ?? 'No bio yet'}</p>
      </DoctorModalSection>
      <DoctorModalSection heading='Testimonials'>
        {doctor && doctor.reviews.length > 0 ? (
          doctor?.reviews.map(
            (review, index) => index < 2 && review && <DoctorReview key={uuid()} review={review} />,
          )
        ) : (
          <span>No testimonials yet</span>
        )}
        {doctor && doctor.reviews.length > 3 && (
          <footer className='testimonials-footer flex justify-center mt-4'>
            <a className='text-main underline cursor-pointer' onClick={() => {}}>
              See more
            </a>
          </footer>
        )}
      </DoctorModalSection>
    </Modal>
  );
};

export default DoctorModal;
