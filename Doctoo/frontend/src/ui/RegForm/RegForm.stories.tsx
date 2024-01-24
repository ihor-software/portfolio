import { Meta, Story } from '@storybook/react';
import RegForm from './RegForm';
import { Provider } from 'react-redux';
import { store } from '../../store/index';
import { GoogleOAuthProvider } from '@react-oauth/google';

const meta: Meta<typeof RegForm> = {
  component: RegForm,
  title: 'UI/forms/RegForm',
};

const Template: Story = args => (
  <GoogleOAuthProvider
    clientId={'296889536498-63dlvj3gtomf2n53j9ggoconqks6qg3s.apps.googleusercontent.com'}
  >
    <Provider store={store}>
      <RegForm {...args} />
    </Provider>
  </GoogleOAuthProvider>
);

export const Primary = Template.bind({});

export default meta;
