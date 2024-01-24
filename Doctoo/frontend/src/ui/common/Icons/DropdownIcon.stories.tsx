import { Meta, StoryObj } from '@storybook/react';
import { DropdownIcon } from './Icons';

const meta: Meta<typeof DropdownIcon> = {
  title: 'UI/Icons/DropdownIcon',
  component: DropdownIcon,
};

export default meta;

export const DefaultDropdownIcon: StoryObj<typeof meta> = {
  render: () => <DropdownIcon />,
};
