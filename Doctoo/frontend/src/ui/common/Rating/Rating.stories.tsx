import { Meta, StoryObj } from '@storybook/react';
import Rating from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'UI/Common/Rating',
  component: Rating,
};

export default meta;

export const Primary: StoryObj<typeof Rating> = {
  render: () => <Rating rating={3.3} className='flex align-center' />,
};

export const WithLabel: StoryObj<typeof Rating> = {
  render: () => (
    <Rating rating={3.8} className='flex align-center'>
      <span className='underline ml-5'>148 reviews</span>
    </Rating>
  ),
};
