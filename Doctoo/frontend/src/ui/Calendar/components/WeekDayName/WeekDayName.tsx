type WeekDayNameProps = {
  weekDay: string;
};

export const WeekDayName = (props: WeekDayNameProps) => {
  return <div className='text-grey-2 w-9 text-center'>{props.weekDay}</div>;
};
