import { Meta, Story } from '@storybook/react';
import CreateAccPage from './CreateAccPage';
import { Provider } from 'react-redux';
import { store } from '../../store/index';
import { GoogleOAuthProvider } from '@react-oauth/google';

const meta: Meta<typeof CreateAccPage> = {
  component: CreateAccPage,
  title: 'Pages/CreateAccPage',
};

const Template: Story = args => (
  <GoogleOAuthProvider
    clientId={'296889536498-63dlvj3gtomf2n53j9ggoconqks6qg3s.apps.googleusercontent.com'}
  >
    <Provider store={store}>
      <CreateAccPage {...args} />
    </Provider>
  </GoogleOAuthProvider>
);

export const Primary = Template.bind({});

export default meta;
