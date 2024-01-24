import { FC } from 'react';
const CardPlaceholder: FC = () => {
  return (
    <div className='flex gap-x-4 my-6 items-center'>
      <div className='bg-grey-5 w-10 h-10 rounded-lg' />
      <div className='bg-grey-5 w-10/12 h-6 rounded-lg' />
    </div>
  );
};

export default CardPlaceholder;
