import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const meta: Meta<typeof Select> = {
  title: 'UI/Common/Select',
  component: Select,
};

type Story = StoryObj<typeof meta>;

const selectOptions: string[] = ['Ukraine', 'USA', 'Canada', 'France', 'London'];

export const SelectBase: Story = {
  render: () => <Select label='Base select' value={selectOptions[0]} options={selectOptions} />,
};

export const SelectError: Story = {
  render: () => (
    <Select
      label='Base select'
      value={''}
      options={selectOptions}
      error
      helperText='This field is required!'
    />
  ),
};

export default meta;
