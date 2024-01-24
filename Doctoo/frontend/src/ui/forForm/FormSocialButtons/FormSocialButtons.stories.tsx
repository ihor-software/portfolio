import { Meta, Story } from '@storybook/react';
import FormSocialButtons, { FormSocialButtonsPropsType } from './FormSocialButtons';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof FormSocialButtons> = {
  component: FormSocialButtons,
  title: 'UI/forForm/FormSocialButtons',
};

const Template: Story<FormSocialButtonsPropsType> = args => <FormSocialButtons {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  handleFacebook: action('handle-facebook'),
  handleGoogle: action('handle-google'),
};

export default meta;
