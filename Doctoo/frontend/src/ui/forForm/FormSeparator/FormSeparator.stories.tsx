import { Meta, Story } from '@storybook/react';
import FormSeparator, { FormSeparatorPropsType } from './FormSeparator';

const meta: Meta<typeof FormSeparator> = {
  component: FormSeparator,
  title: 'UI/forForm/FormSeparator',
};

const Template: Story<FormSeparatorPropsType> = args => <FormSeparator {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'or continue with email',
};

export default meta;
