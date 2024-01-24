import icons from 'src/ui/common/Icon/iconPaths';
import { Meta, StoryObj } from '@storybook/react';
import { PaymentMethod } from './PaymentMethod';
import { Button } from '../Button';

const meta: Meta<typeof PaymentMethod> = {
  title: 'UI/Common/PaymentMethod',
  component: PaymentMethod,
};

export default meta;

export const PaymentMethodStory: StoryObj<typeof meta> = {
  render: () => {
    return (
      <div className='w-[500px] flex rounded-md px-4 py-2.5  flex-col items-start gap-4 md:flex-row md:justify-between'>
        <PaymentMethod cardNumber='1111 2222 3333 5555' expMonth={7} expYear={2024} />
        <Button variant='flat' icon={icons.edit} onClick={() => alert('Open payment edit modal')}>
          Edit
        </Button>
      </div>
    );
  },
};
