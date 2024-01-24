import { Meta, Story } from '@storybook/react';
import LoginForm from './LoginForm';
import { GoogleOAuthProvider } from '@react-oauth/google';

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  title: 'UI/forms/LoginForm',
};

const Template: Story = args => (
  <GoogleOAuthProvider
    clientId={'296889536498-63dlvj3gtomf2n53j9ggoconqks6qg3s.apps.googleusercontent.com'}
  >
    <LoginForm {...args} />
  </GoogleOAuthProvider>
);

export const Primary = Template.bind({});

export default meta;
