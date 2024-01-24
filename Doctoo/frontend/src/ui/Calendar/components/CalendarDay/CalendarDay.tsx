type CalendarDayProps = {
  state: string;
  dayNumber: number;
  onClick: (dayNumber: number) => void;
  date: Date;
};

export const CalendarDay = (props: CalendarDayProps) => {
  return (
    <>
      <div
        onClick={() => props.onClick(props.dayNumber)}
        className={`${props.state} text-center px-2.5 py-2 flex flex-col items-center`}
      >
        <p>{props.dayNumber}</p>
      </div>
    </>
  );
};
