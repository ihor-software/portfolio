import { Meta, Story } from '@storybook/react';
import FormTitle, { FormTitlePropsType } from './FormTitle';

const meta: Meta<typeof FormTitle> = {
  component: FormTitle,
  title: 'UI/forForm/FormTitle',
};

const Template: Story<FormTitlePropsType> = args => <FormTitle {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Create account',
  subtext: 'Select a method to create account:',
};

export default meta;
