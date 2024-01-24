import { Meta, StoryObj } from '@storybook/react';
import { LeftArrowIcon } from './Icons';

const meta: Meta<typeof LeftArrowIcon> = {
  title: 'UI/Icons/LeftArrowIcon',
  component: LeftArrowIcon,
};

export default meta;

export const DefaultLeftArrowIcon: StoryObj<typeof meta> = {
  render: () => <LeftArrowIcon />,
};
