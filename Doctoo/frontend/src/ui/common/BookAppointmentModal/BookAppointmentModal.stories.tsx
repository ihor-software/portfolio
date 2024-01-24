import { Meta, StoryObj } from '@storybook/react';
import BookAppointmentModal from './BookAppointmentModal';
import { useState } from 'react';
import { Appointment, AppointmentStatus } from 'src/types/appointment.types';
import { getRandomMockAppointment } from 'src/utils/mock-utils';

const meta: Meta<typeof BookAppointmentModal> = {
  title: 'UI/Common/BookAppointmentModal',
  component: BookAppointmentModal,
  parameters: {
    backgrounds: {
      default: 'bg',
      values: [
        {
          name: 'bg',
          value: '#F1F6F9',
        },
      ],
    },
  },
};

export default meta;

const appointment: Appointment = getRandomMockAppointment();

export const Planned: StoryObj<typeof BookAppointmentModal> = {
  render: () => {
    const [state, setState] = useState({ isVisible: true });

    return (
      <>
        {state.isVisible && (
          <BookAppointmentModal
            appointment={{ ...appointment, status_cd: AppointmentStatus.PLANNED }}
            onClose={() => setState({ ...state, isVisible: false })}
          />
        )}
      </>
    );
  },
};

export const Canceled: StoryObj<typeof BookAppointmentModal> = {
  render: () => {
    const [state, setState] = useState({ isVisible: true });

    return (
      <>
        {state.isVisible && (
          <BookAppointmentModal
            appointment={{ ...appointment, status_cd: AppointmentStatus.CANCELED }}
            onClose={() => setState({ ...state, isVisible: false })}
          />
        )}
      </>
    );
  },
};

export const Completed: StoryObj<typeof BookAppointmentModal> = {
  render: () => {
    const [state, setState] = useState({ isVisible: true });

    return (
      <>
        {state.isVisible && (
          <BookAppointmentModal
            isOpened={state.isVisible}
            appointment={{ ...appointment, status_cd: AppointmentStatus.COMPLETED }}
            onClose={() => setState({ ...state, isVisible: false })}
          />
        )}
      </>
    );
  },
};
