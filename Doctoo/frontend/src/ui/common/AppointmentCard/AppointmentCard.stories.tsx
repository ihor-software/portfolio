import { Meta, StoryObj } from '@storybook/react';
import AppointmentCard from './AppointmentCard';
import { Appointment, AppointmentStatus } from 'src/types/appointment.types';
import { getRandomMockAppointment } from 'src/utils/mock-utils';

const meta: Meta<typeof AppointmentCard> = {
  title: 'UI/Common/AppointmentCard',
  component: AppointmentCard,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export default meta;

const appointment: Appointment = getRandomMockAppointment();

export const PlannedAppointmentCard: StoryObj<typeof meta> = {
  render: () => {
    return (
      <AppointmentCard appointment={{ ...appointment, status_cd: AppointmentStatus.PLANNED }} />
    );
  },
};

export const CanceledAppointmentCard: StoryObj<typeof meta> = {
  render: () => {
    return (
      <AppointmentCard appointment={{ ...appointment, status_cd: AppointmentStatus.CANCELED }} />
    );
  },
};

export const CompletedAppointmentCard: StoryObj<typeof meta> = {
  render: () => {
    return (
      <AppointmentCard appointment={{ ...appointment, status_cd: AppointmentStatus.COMPLETED }} />
    );
  },
};
