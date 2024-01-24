import { Meta, Story } from '@storybook/react';
import TwoFactorAuthPage from './TwoFactorAuthPage';

const meta: Meta<typeof TwoFactorAuthPage> = {
  component: TwoFactorAuthPage,
  title: 'Pages/TwoFactor',
};

const Template: Story = args => <TwoFactorAuthPage {...args} />;
export const Primary = Template.bind({});

export default meta;
