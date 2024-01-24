import { Meta, Story } from '@storybook/react';
import TwoFactorForm from './TwoFactorForm';

const meta: Meta<typeof TwoFactorForm> = {
  component: TwoFactorForm,
  title: 'UI/forms/TwoFactorForm',
};

const Template: Story = args => (
  <TwoFactorForm {...args} userId={0} handleResendCode={async () => await console.log('2')} />
);

export const Primary = Template.bind({});

export default meta;
