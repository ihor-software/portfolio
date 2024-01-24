import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Common/Input',
  component: Input,
};

type Story = StoryObj<typeof meta>;

export const InputBase: Story = {
  render: () => <Input label='Input' placeholder='example@gmail.com' value={''} />,
};

export const InputError: Story = {
  render: () => (
    <Input label='Error Input' value={'e@mail.coms'} helperText='Enter valid email!' error={true} />
  ),
};

export const Password: Story = {
  render: () => <Input label='Password' value={''} password />,
};

export default meta;
