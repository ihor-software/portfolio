import { WeekDayName } from '../WeekDayName/WeekDayName';

export const WeekDaySet = () => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div className='flex mb-3 justify-between px-1 gap-2'>
      {weekDays.map(weekDay => (
        <WeekDayName key={weekDay} weekDay={weekDay} />
      ))}
    </div>
  );
};
