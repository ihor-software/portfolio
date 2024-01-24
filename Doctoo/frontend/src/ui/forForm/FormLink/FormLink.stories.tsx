import { Meta, Story } from '@storybook/react';
import FormLink, { FormLinkPropsType } from './FormLink';

const meta: Meta<typeof FormLink> = {
  component: FormLink,
  title: 'UI/forForm/FormLink',
};

const Template: Story<FormLinkPropsType> = args => <FormLink {...args} />;

export const CreateAcc = Template.bind({});
CreateAcc.args = {
  text: 'Already have an account?',
  linkText: 'Log in',
  href: '/login',
};

export const LogIn = Template.bind({});
LogIn.args = {
  text: `Don't have an account?`,
  linkText: 'Create account',
  href: '/register',
};

export default meta;
