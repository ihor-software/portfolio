import React, { Dispatch, SetStateAction, useState } from 'react';
import Header from '../common/Header/Header';
import { CalendarDaySet } from './components/CalendarDaySet/CalendarDaySet';
import { WeekDaySet } from './components/WeekDaySet/WeekDaySet';

type CalendarProps = {
  value: Date;
  onChange: Dispatch<SetStateAction<Date>>;
  minDate?: Date;
  maxDate?: Date;
};

export const Calendar = ({ value, onChange }: CalendarProps) => {
  const [initDate, setInitDate] = useState(new Date(value));
  return (
    <div className='w-full p-6 rounded-xl shadow-sm bg-white select-none'>
      <Header date={initDate} setDate={setInitDate} />
      <div>
        <WeekDaySet />
        <CalendarDaySet dateOnPage={initDate} selectedDate={value} onDateChange={onChange} />
      </div>
    </div>
  );
};
