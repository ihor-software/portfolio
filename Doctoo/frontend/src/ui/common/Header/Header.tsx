import { FC } from 'react';
import { LeftArrowIcon, RightArrowIcon } from '../Icons/Icons';

type HeaderProps = {
  date: Date;
  setDate?: (date: Date) => any;
  className?: string;
};

const intl = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });

const Header: FC<HeaderProps> = ({ date, className = '', setDate }) => {
  return (
    <header className={`flex items-center justify-between pb-5 px-1 ${className}`}>
      <h3 className='font-medium text-lg'>{intl.format(date)}</h3>
      <div className='controls flex ml-5 text-dark-grey items-center'>
        <span
          className='calendar-control mx-1 cursor-pointer'
          onClick={() => setDate?.(new Date(date.setMonth(date.getMonth() - 1)))}
        >
          <LeftArrowIcon />
        </span>
        <span
          className='calendar-control mx-1 cursor-pointer'
          onClick={() => setDate?.(new Date(date.setMonth(date.getMonth() + 1)))}
        >
          <RightArrowIcon />
        </span>
      </div>
    </header>
  );
};

export default Header;
