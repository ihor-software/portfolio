import { FC } from 'react';
import { Doctor } from 'src/types/doctor.types';
import BookAppointmentModal from 'src/ui/common/BookAppointmentModal/BookAppointmentModal';
import { Button } from 'src/ui/common/Button';
import DoctorModal from 'src/ui/common/DoctorModal/DoctorModal';

interface SlotsProps {
  doctor: Doctor | undefined | null;
  onClick?: () => void;
}

const Slots: FC<SlotsProps> = ({ doctor, onClick }) => {
  return (
    <>
      {' '}
      <div className='grid grid-cols-2 grid-rows-2 gap-1'>
        <div>
          {/* <Button variant='secondary' onClick={onClick} additionalStyle='w-full'>
            1:00 pm
          </Button> */}
        </div>
        <div>
          {/* <Button variant='secondary' onClick={onClick} additionalStyle='w-full'>
            2:00 pm
          </Button> */}
        </div>
        <div>
          {/* <Button variant='secondary' onClick={onClick} additionalStyle='w-full'>
            3:00 pm
          </Button> */}
        </div>
        <div>
          <Button variant='secondary' onClick={onClick} additionalStyle='w-full'>
            Book
          </Button>
        </div>
      </div>
    </>
  );
};

export default Slots;
