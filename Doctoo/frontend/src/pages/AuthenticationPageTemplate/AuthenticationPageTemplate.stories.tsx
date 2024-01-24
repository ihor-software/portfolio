import { Meta, Story } from '@storybook/react';
import AuthenticationPageTemplate, {
  AuthenticationPageTemplatePropsType,
} from './AuthenticationPageTemplate';

const meta: Meta<typeof AuthenticationPageTemplate> = {
  component: AuthenticationPageTemplate,
  title: 'Pages/AuthenticationPageTemplate',
};

const Template: Story<AuthenticationPageTemplatePropsType> = args => (
  <AuthenticationPageTemplate {...args} />
);

export const Primary = Template.bind({});

export default meta;
