import type { Meta, StoryObj } from '@storybook/react';
import Alert from './Alert';
import { useState } from 'react';

const meta: Meta<typeof Alert> = {
  title: 'UI/Common/Alert',
  component: Alert,
};

type Story = StoryObj<typeof meta>;

export const AlertInfo: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return <Alert {...{ open, setOpen }} label='The confirmation message was sent to your email' />;
  },
};

export const AlertError: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Alert
        {...{ open, setOpen }}
        label='The confirmation message was`n sent to your email due to internal error'
        option='error'
      />
    );
  },
};

export const AlertSuccess: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Alert
        {...{ open, setOpen }}
        label='The confirmation message was sent to your email successfully'
        option='success'
      />
    );
  },
};

export default meta;
