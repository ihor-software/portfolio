import { Meta } from '@storybook/react';
import { ForgotPasswordPage } from './ForgotPassword';

type ForgotPasswordPageType = typeof ForgotPasswordPage;

const meta: Meta<ForgotPasswordPageType> = {
  component: ForgotPasswordPage,
  title: 'Pages/ForgotPasswordPage',
};

export const Page = () => {
  return <ForgotPasswordPage />;
};

export default meta;
