import { Meta, Story } from '@storybook/react';
import TwoFactorInput, { TwoFactorInputPropsType } from './TwoFactorInput';

const meta: Meta<typeof TwoFactorInput> = {
  component: TwoFactorInput,
  title: 'UI/forForm/TwoFactorInput',
};

const Template: Story<TwoFactorInputPropsType> = args => <TwoFactorInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  setCode: input => input,
};

export default meta;
