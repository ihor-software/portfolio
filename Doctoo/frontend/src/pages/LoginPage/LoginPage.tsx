import { FC } from 'react';
import { AuthenticationPageTemplate } from '../AuthenticationPageTemplate';
import LoginForm from 'src/ui/LoginForm/LoginForm';

const LoginPage: FC = () => {
  return (
    <AuthenticationPageTemplate>
      <LoginForm />
    </AuthenticationPageTemplate>
  );
};

export default LoginPage;
