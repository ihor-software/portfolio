import { Meta } from '@storybook/react';
import { ResetPasswordPage } from './ResetPassword';

type ResetPasswordPageType = typeof ResetPasswordPage;

const meta: Meta<ResetPasswordPageType> = {
  component: ResetPasswordPage,
  title: 'Pages/ResetPasswordPage',
};

export const Page = () => {
  return <ResetPasswordPage />;
};

export default meta;
