import { VerifyRegistrationPageError } from './VerifyRegistrationPage';
import { Meta, Story } from '@storybook/react';

const meta: Meta<typeof VerifyRegistrationPageError> = {
  component: VerifyRegistrationPageError,
  title: 'Pages/VerifyRegistrationPageceError',
};

const Template: Story = args => <VerifyRegistrationPageError {...args} />;

export const Primary = Template.bind({});

export default meta;
