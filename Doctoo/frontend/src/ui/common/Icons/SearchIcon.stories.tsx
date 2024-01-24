import { Meta, StoryObj } from '@storybook/react';
import { SearchIcon } from './Icons';

const meta: Meta<typeof SearchIcon> = {
  title: 'UI/Icons/SearchIcon',
  component: SearchIcon,
};

export default meta;

export const DefaultSearchIcon: StoryObj<typeof meta> = {
  render: () => <SearchIcon />,
};
