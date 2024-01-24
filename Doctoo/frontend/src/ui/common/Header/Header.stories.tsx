import { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import { useState } from 'react';

const meta: Meta<typeof Header> = {
  title: 'UI/Common/Header',
  component: Header,
};

export default meta;

export const MonthHeader: StoryObj<typeof meta> = {
  render: () => {
    const [state, setState] = useState({ date: new Date() });

    return <Header date={state.date} setDate={date => setState({ ...state, date: date })} />;
  },
};
