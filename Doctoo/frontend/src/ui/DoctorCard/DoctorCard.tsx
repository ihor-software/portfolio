import { FC } from 'react';
import Tag, { TagTextType } from '../common/Tag/Tag';
import icons from '../common/Icon/iconPaths';
import { Icon } from '../common/Icon';
import Slots from './slots/Slots';
import { Doctor } from 'src/types/doctor.types';
import { Button } from '../common';

type DoctorCardProps = {
  src: string;
  doctor: Doctor | undefined | null;
  option: 'search' | 'saved';
  selectDoctor?: () => void;
  filterByTime?: boolean;
};

const DoctorCard: FC<DoctorCardProps> = ({
  src,
  doctor,
  option,
  selectDoctor,
  filterByTime = false,
}) => {
  const doctorAvailability = !filterByTime || Boolean(doctor?.available);
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Icon
      key={index}
      src={doctor && index + 1 <= Math.round(doctor.rating) ? icons.activeStar : icons.inactiveStar}
      alt='star'
    />
  ));
  return (
    <div className='p-6 flex justify-between items-start h-fit bg-white rounded-xl'>
      <div className='flex gap-3'>
        <img
          src={doctor?.user.avatar ?? src}
          alt='doctor image'
          className='w-28 h-28 object-cover rounded-lg'
        />
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <p className='text-lg font-semibold'>
              Dr. {doctor?.user?.first_name} {doctor?.user?.last_name}
            </p>
            <p className='text-grey-1 text-base font-medium'>{doctor?.specialty}</p>
            <div className='flex gap-2'>
              <Tag
                text={doctorAvailability ? 'Available' : 'Unavailable'}
                variant={doctorAvailability ? TagTextType.Primary : TagTextType.Error}
              />
              {option === 'search' && doctor && doctor.rating >= 4.5 && <Tag text='Top Doctor' />}
            </div>
          </div>
          <div className='flex flex-col gap-3 lg:flex-row flex-wrap'>
            <div className='flex'>{stars}</div>
            <p className='underline decoration-solid text-black-2 cursor-pointer'>
              {doctor && doctor.reviews.length + ' reviews'}
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-end gap-4'>
        {option === 'search' ? (
          <>
            <div>
              <p className='text-sm text-grey-2'>
                <span className='text-lg text-black-2'>{'$' + (doctor ? doctor.payrate : 0)}</span>{' '}
                / visit
              </p>
            </div>
            <div className='invisible xl:visible'>
              <Slots doctor={doctor} onClick={selectDoctor} />
            </div>
          </>
        ) : (
          <Button additionalStyle='w-32' onClick={selectDoctor}>
            Book
          </Button>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
