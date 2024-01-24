import { Meta, StoryObj } from '@storybook/react';
import { RightArrowIcon } from './Icons';

const meta: Meta<typeof RightArrowIcon> = {
  title: 'UI/Icons/RightArrowIcon',
  component: RightArrowIcon,
};

export default meta;

export const DefaultRightArrowIcon: StoryObj<typeof meta> = {
  render: () => <RightArrowIcon />,
};
