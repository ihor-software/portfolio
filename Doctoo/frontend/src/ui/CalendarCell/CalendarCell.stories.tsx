import type { Meta, StoryObj } from '@storybook/react';
import CalendarCell from './CalendarCell';

const meta: Meta<typeof CalendarCell> = {
  title: 'UI/CalendarCell',
  component: CalendarCell,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CalendarCell day={6} isDisabled={false} isToday={false} />,
};

export const Disabled: Story = {
  render: () => <CalendarCell day={6} isDisabled={true} isToday={false} />,
};

export const MultipleCalls: Story = {
  render: () => <CalendarCell day={6} isDisabled={false} callsCount={2} isToday={false} />,
};

export const WithDoctorTag: Story = {
  render: () => (
    <CalendarCell day={6} isDisabled={false} doctor_lastname='Dr. Leslie' isToday={false} />
  ),
};

export const Today: Story = {
  render: () => <CalendarCell day={6} isDisabled={false} doctor_lastname='Leslie' isToday={true} />,
};

export default meta;
