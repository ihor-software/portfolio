import { Meta, StoryObj } from '@storybook/react';
import { PhoneInput } from './PhoneInput';

const meta: Meta<typeof PhoneInput> = {
  title: 'UI/forForm/PhoneInput',
  component: PhoneInput,
};

export default meta;

export const PhoneInputStory: StoryObj<typeof meta> = {
  render: () => {
    return (
      <div className='w-[500px] '>
        <PhoneInput value='+380958293584' />
      </div>
    );
  },
};
