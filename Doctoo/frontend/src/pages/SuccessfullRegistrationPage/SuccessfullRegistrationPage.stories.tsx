import SuccessfullRegistrationPage from './SuccessfullRegistrationPage';
import { Meta, Story } from '@storybook/react';

const meta: Meta<typeof SuccessfullRegistrationPage> = {
  component: SuccessfullRegistrationPage,
  title: 'Pages/SuccessfullRegistrationPage',
};

const Template: Story = args => <SuccessfullRegistrationPage {...args} />;

export const Primary = Template.bind({});

export default meta;
