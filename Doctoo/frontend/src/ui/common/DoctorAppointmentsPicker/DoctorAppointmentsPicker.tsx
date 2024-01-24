import { FC, useCallback, useEffect, useState } from 'react';
import { Doctor } from 'src/types/doctor.types';
import { LeftArrowIcon, RightArrowIcon } from '../Icons/Icons';
import styles from './DoctorAppointmentsPicker.module.css';
import { v4 as uuid } from 'uuid';
import { useAppSelector } from 'src/hooks/redux';
import { getDoctorAppointments } from 'src/store/slices/doctor.slice';

export type DoctorAppointmentsPickerProps = {
  doctor: Doctor | undefined | null;
  initialDate?: Date;
  variant?: 'compact' | 'default' | 'extended';
  onChange?: (...args: any[]) => void;
  className?: string;
};

export type DoctorAppointmentsPickerState = {
  currentDate: Date;
  displayedDays: any[];
  selectedAppointmentDatetime?: Date;
};

export type DoctorAppointmentSlot = {
  datetime: Date;
  isAvailable: boolean;
};

const initialState: DoctorAppointmentsPickerState = {
  currentDate: new Date(),
  displayedDays: [],
};

const intlDate = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
});

const intlTime = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

const DoctorAppointmentsPicker: FC<DoctorAppointmentsPickerProps> = ({
  doctor,
  onChange,
  initialDate = new Date(),
  variant = 'default',
  className = '',
}) => {
  const [state, setState] = useState({
    ...initialState,
    currentDate: initialDate,
  });

  const getDisplayedDaysNumberByVariant = useCallback(
    (variant: 'compact' | 'default' | 'extended') => {
      switch (variant) {
        case 'compact':
          return 1;
        case 'default':
          return 3;
        case 'extended':
          return 5;
      }
    },
    [],
  );

  const getDisplayedDays = useCallback((selectedDate: Date) => {
    const displayedDaysNumber = getDisplayedDaysNumberByVariant(variant);

    return [...Array(displayedDaysNumber)].map((_, index) => {
      const currentDate = structuredClone(selectedDate);
      const date = new Date(
        currentDate.setDate(currentDate.getDate() - Math.floor(displayedDaysNumber / 2) + index),
      );
      const [weekdayString, dateString] = intlDate.format(date).split(', ');

      return { date, weekdayString, dateString };
    });
  }, []);

  useEffect(() => {
    setState({ ...state, displayedDays: getDisplayedDays(state.currentDate) });
  }, []);

  return (
    <div className={`doctor-appointments-calendar mt-9 ${className}`}>
      <DoctorAppointmentsPickerHeader
        state={state}
        onClickShowNextDays={() => {
          const currentDate = new Date(
            state.currentDate.setDate(state.currentDate.getDate() + state.displayedDays.length),
          );
          const displayedDays = getDisplayedDays(currentDate);
          setState({ ...state, currentDate, displayedDays });
        }}
        onClickShowPrevDays={() => {
          const currentDate = new Date(
            state.currentDate.setDate(state.currentDate.getDate() - state.displayedDays.length),
          );
          const displayedDays = getDisplayedDays(currentDate);
          setState({ ...state, currentDate, displayedDays });
        }}
      />
      <DoctorAppointmentsPickerBody
        state={state}
        doctor={doctor}
        onChange={(datetime: Date) => {
          setState({ ...state, selectedAppointmentDatetime: datetime });
          onChange?.(datetime);
        }}
      />
    </div>
  );
};

type DoctorAppointmentsPickerHeaderProps = {
  state: DoctorAppointmentsPickerState;
  onClickShowNextDays: (...args: any[]) => void;
  onClickShowPrevDays: (...args: any[]) => void;
};

const DoctorAppointmentsPickerHeader: FC<DoctorAppointmentsPickerHeaderProps> = ({
  state,
  onClickShowNextDays,
  onClickShowPrevDays,
}) => {
  return (
    <header className='w-full flex justify-center items-center'>
      <div className='w-1/12 flex justify-center'>
        <span className='cursor-pointer' onClick={onClickShowPrevDays}>
          <LeftArrowIcon />
        </span>
      </div>
      <div className='w-10/12 flex'>
        {state.displayedDays.map(day => (
          <div className='w-full p-2' key={uuid()}>
            <div
              className={`${styles.columnHeading} ${
                (state.selectedAppointmentDatetime ?? state.currentDate).toLocaleDateString() ===
                day.date.toLocaleDateString()
                  ? 'bg-main-light font-semibold'
                  : ''
              }`}
            >
              <span className={styles.columnHeadingText}>{day.weekdayString}</span>
              <span className={styles.columnHeadingText}>{day.dateString}</span>
            </div>
          </div>
        ))}
      </div>
      <div className='w-1/12 flex justify-center'>
        <span className='cursor-pointer' onClick={onClickShowNextDays}>
          <RightArrowIcon />
        </span>
      </div>
    </header>
  );
};

type DoctorAppointmentsPickerBodyProps = {
  state: DoctorAppointmentsPickerState;
  doctor: Doctor | undefined | null;
  onChange?: (...args: any[]) => void;
};

const DoctorAppointmentsPickerBody: FC<DoctorAppointmentsPickerBodyProps> = ({
  doctor,
  state,
  onChange,
}) => {
  const doctorAppointments = useAppSelector(getDoctorAppointments(doctor ? doctor.user_id : 0));

  const getAppointmentsSlotsByDay = useCallback(
    (date: Date) => {
      const slots: DoctorAppointmentSlot[] = [];

      if (doctor?.schedule && date.getDay() < 5) {
        const [doctorDayStartHours, doctorDayStartMinutes] = doctor.schedule
          .split('-')[0]
          .split(':');
        const [doctorDayEndHours, doctorDayEndMinutes] = doctor.schedule.split('-')[1].split(':');

        const startTime = new Date(
          structuredClone(date).setHours(
            Number(doctorDayStartHours),
            Number(doctorDayStartMinutes),
            0,
          ),
        );
        const endTime = new Date(
          structuredClone(date).setHours(Number(doctorDayEndHours), Number(doctorDayEndMinutes), 0),
        );

        for (
          let i = startTime;
          i <= endTime;
          i = new Date(structuredClone(i).setHours(structuredClone(i).getHours() + 1))
        ) {
          slots.push({
            isAvailable: Boolean(
              new Date().getTime() < i.getTime() &&
                !doctorAppointments.find(
                  appointment => appointment.date_time.toLocaleString() === i.toLocaleString(),
                ),
            ),
            datetime: i,
          });
        }
      }

      return slots;
    },
    [doctor, doctorAppointments],
  );

  return (
    <div className='w-full flex justify-center mt-8'>
      <div className='w-10/12 flex'>
        {state.displayedDays.map(day => (
          <div className='w-full p-2' key={uuid()}>
            {getAppointmentsSlotsByDay(day.date).map(slot => (
              <div
                className={`${styles.slot} ${
                  slot.isAvailable ? styles.availableSlot : styles.inavailableSlot
                } ${
                  state.selectedAppointmentDatetime?.toLocaleString() ===
                  slot.datetime.toLocaleString()
                    ? styles.selectedSlot
                    : ''
                }`}
                key={uuid()}
                onClick={slot.isAvailable ? () => onChange?.(slot.datetime) : undefined}
              >
                {intlTime.format(slot.datetime).toLocaleLowerCase()}
              </div>
            ))}
            {!getAppointmentsSlotsByDay(day.date).length && (
              <div className='flex border border-grey-8 justify-center items-center h-full rounded-lg'>
                <span className='text-center text-grey-8'>Day Off</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointmentsPicker;
