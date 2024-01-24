import { Dispatch, SetStateAction } from 'react';
import styles from './CalendarDaySet.module.css';
import { CalendarDay } from '../CalendarDay/CalendarDay';

type CalendarDaySetProps = {
  dateOnPage: Date;
  selectedDate: Date;
  onDateChange: Dispatch<SetStateAction<Date>>;
};

export const CalendarDaySet = (props: CalendarDaySetProps) => {
  const currYear = props.dateOnPage.getFullYear();
  const currMonth = props.dateOnPage.getMonth();

  const lastDayOfLastMonth = new Date(currYear, currMonth, 0).getDay();
  const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
  const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

  const daysPerPage = 42;

  const checkStatus = (dayValue: number) => {
    switch (true) {
      case props.selectedDate.toDateString() ===
        new Date(currYear, currMonth, dayValue).toDateString():
        return styles.selected;

      default:
        return styles.default;
    }
  };

  const handleDatePick = (selectedDay: number) => {
    const selectedDate = new Date(currYear, currMonth, selectedDay);
    props.onDateChange(selectedDate);
  };

  return (
    <div className='grid grid-cols-7 list-none gap-y-2'>
      {[...Array(lastDayOfLastMonth)].map((x, i, array) => (
        <CalendarDay
          key={i}
          state={styles.disabled}
          dayNumber={lastDateOfLastMonth - array.length + i + 1}
          onClick={() => {}}
          date={new Date(currYear, currMonth - 1, lastDateOfLastMonth - array.length + i + 1)}
        />
      ))}

      {[...Array(lastDateOfMonth)].map((x, i) => (
        <CalendarDay
          key={i}
          dayNumber={i + 1}
          state={checkStatus(i + 1)}
          onClick={handleDatePick}
          date={new Date(currYear, currMonth, i + 1)}
        />
      ))}

      {[...Array(daysPerPage - lastDateOfMonth - lastDayOfLastMonth)].map((x, i) => (
        <CalendarDay
          key={i}
          dayNumber={i + 1}
          state={styles.disabled}
          onClick={() => {}}
          date={new Date(currYear, currMonth + 1, i + 1)}
        />
      ))}
    </div>
  );
};
