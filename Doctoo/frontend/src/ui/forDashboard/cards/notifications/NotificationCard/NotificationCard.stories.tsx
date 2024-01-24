import type { Meta, StoryObj } from '@storybook/react';
import NotificationCard from './NotificationCard';
import { Notification } from 'src/types/notification.types';

const meta: Meta<typeof NotificationCard> = {
  title: 'UI/NotificationCard',
  component: NotificationCard,
};

type Story = StoryObj<typeof meta>;

const appointmentNotificationSkipped: Notification = {
  id: 1,
  type: 'appointment',
  appointment: {
    id: 1,
    doctor: {
      first_name: 'Savannah',
      last_name: 'Nguyen',
    },
    is_visited: false,
    is_paid: false,
    date_time: new Date('2023-08-25T13:55:05'),
  },
  createdAt: new Date('2023-08-25T05:03:05'),
};

const appointmentNotificationSuccess: Notification = {
  id: 1,
  type: 'appointment',
  appointment: {
    id: 1,
    doctor: {
      first_name: 'Savannah',
      last_name: 'Nguyen',
    },
    is_visited: true,
    is_paid: false,
    date_time: new Date('2023-08-25T05:03:05'),
  },
  createdAt: new Date('2023-08-25T05:03:05'),
};

const invoice: Notification = {
  id: 1,
  type: 'payment',
  appointment: {
    id: 1,
    doctor: {
      first_name: 'Savannah',
      last_name: 'Nguyen',
    },
    is_visited: true,
    is_paid: false,
    date_time: new Date('2023-08-25T05:03:05'),
  },
  createdAt: new Date('2023-08-25T05:03:05'),
};

const successfulPayment: Notification = {
  id: 1,
  type: 'payment',
  appointment: {
    id: 1,
    doctor: {
      first_name: 'Savannah',
      last_name: 'Nguyen',
    },
    is_visited: true,
    is_paid: true,
    date_time: new Date('2023-08-25T05:03:05'),
  },
  createdAt: new Date('2023-08-25T05:03:05'),
};

export const AppointmentSkipped: Story = {
  render: () => <NotificationCard notification={appointmentNotificationSkipped} />,
};

export const AppointmentSuccessful: Story = {
  render: () => <NotificationCard notification={appointmentNotificationSuccess} />,
};

export const Invoice: Story = {
  render: () => <NotificationCard notification={invoice} />,
};

export const SuccessfulPayment: Story = {
  render: () => <NotificationCard notification={successfulPayment} />,
};

export default meta;
