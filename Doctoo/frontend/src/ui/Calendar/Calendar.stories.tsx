import type { Meta } from '@storybook/react';
import { Calendar } from './Calendar';
import { useState } from 'react';

const meta: Meta<typeof Calendar> = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const Default = () => {
  const [date, setDate] = useState(new Date());
  return <Calendar value={date} onChange={setDate} />;
};

export default meta;
