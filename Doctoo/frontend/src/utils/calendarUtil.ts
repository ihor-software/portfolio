export function getDaysInMonth(year: number, month: number): Date[] {
  const daysInMonth: Date[] = [];
  const lastDay = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= lastDay; day++) {
    daysInMonth.push(new Date(year, month, day));
  }

  return daysInMonth;
}

export function addDates(monthDates: Date[]): Date[] {
  const firstDay = monthDates[0];
  const weekdayFirstDay = firstDay.getDay();

  const daysToAdd = (weekdayFirstDay + 6) % 7;

  for (let i = 0; i < daysToAdd; i++) {
    const firstDate = monthDates[0];
    const prevMonthLastDay = new Date(firstDate);
    prevMonthLastDay.setDate(prevMonthLastDay.getDate() - 1);
    monthDates.unshift(prevMonthLastDay);
  }

  while (monthDates.length % 7 !== 0) {
    const lastDate = monthDates[monthDates.length - 1];
    const nextMonthDate = new Date(lastDate);
    nextMonthDate.setDate(nextMonthDate.getDate() + 1);
    monthDates.push(nextMonthDate);
  }

  return monthDates;
}

export const compareDays = (dateA: Date, dateB: Date) => {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
};
