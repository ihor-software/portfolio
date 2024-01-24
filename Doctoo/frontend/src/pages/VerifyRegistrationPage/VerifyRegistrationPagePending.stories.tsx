import { VerifyRegistrationPagePending } from './VerifyRegistrationPage';
import { Meta, Story } from '@storybook/react';

const meta: Meta<typeof VerifyRegistrationPagePending> = {
  component: VerifyRegistrationPagePending,
  title: 'Pages/VerifyRegistrationPagePending',
};

const Template: Story = args => <VerifyRegistrationPagePending {...args} />;

export const Primary = Template.bind({});

export default meta;
