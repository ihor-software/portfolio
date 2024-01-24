import { Meta, Story } from '@storybook/react';
import LoginPage from './LoginPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

const meta: Meta<typeof LoginPage> = {
  component: LoginPage,
  title: 'Pages/LoginPage',
};

const Template: Story = args => (
  <GoogleOAuthProvider
    clientId={'296889536498-63dlvj3gtomf2n53j9ggoconqks6qg3s.apps.googleusercontent.com'}
  >
    <LoginPage {...args} />{' '}
  </GoogleOAuthProvider>
);
export const Primary = Template.bind({});

export default meta;
