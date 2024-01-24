import { FC } from 'react';
import { FormLogo } from '../forForm/FormLogo';
import { Button } from '../common/Button';
import FormLink from '../forForm/FormLink/FormLink';
import styles from './LoginForm.module.css';
import { Input } from '../common/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerValidation } from '../RegForm/validation';
import { useNavigate } from 'react-router-dom';
import { loginUser } from 'src/store/services';
import { FormTitle } from '../forForm/FormTitle';
import { FormSocialButtons } from '../forForm/FormSocialButtons';
import { FormSeparator } from '../forForm/FormSeparator';
import useGoogleAuthentication from 'src/use-google-authentication';
import { useGoogleLogin } from '@react-oauth/google';
import { setMessage } from 'src/store/slices/systemMessage.slice';
import { getUserThunk } from 'src/store/slices/auth';
import { useAppDispatch } from 'src/hooks/redux';

export type LoginInputsType = {
  email: string;
  password: string;
};

const LoginForm: FC = () => {
  const { handleSignIn } = useGoogleAuthentication();
  const signIn = useGoogleLogin({
    onSuccess: tokenResponse =>
      handleSignIn(
        tokenResponse,
        () => {
          dispatch(getUserThunk());
          navigate('/dashboard');
        },
        () =>
          dispatch(
            setMessage({ message: `Sign in error. Wrong user credentials!`, status: 'error' }),
          ),
      ),
  });

  const navigate = useNavigate();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputsType>({
    mode: 'onSubmit',
  });

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<LoginInputsType> = async data => {
    try {
      const response = await loginUser(data);
      const responseBody = await response.json();
      if (response.status === 200) {
        if (responseBody.message) {
          return navigate('/two-fa/verify', { state: { userId: responseBody.id, ...data } });
        }
        dispatch(getUserThunk());
        navigate('/');
      } else {
        dispatch(setMessage({ message: responseBody.message, status: 'error' }));
      }
    } catch (error: any) {
      setError('root.serverError', { type: 'iternalServerError', message: 'InternalServerError' });
      dispatch(
        setMessage({
          message: error.message || 'Internal Server Error, try again later!',
          status: 'error',
        }),
      );
    }
  };

  return (
    <>
      <form className={styles['form-container']} onSubmit={handleSubmit(onSubmit)}>
        <FormLogo />
        <FormTitle title='Log in' subtext='Welcome back! Select a method to log in:' />
        <FormSocialButtons handleGoogle={() => signIn()} />
        <FormSeparator text='or continue with email' />
        <Input
          label='Email'
          {...register('email', registerValidation.email)}
          value=''
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
        <Input
          label='Password'
          password
          {...register('password', registerValidation.password)}
          value=''
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />
        <FormLink text='' linkText='Forgot your password?' href='/forgot-password' />
        <Button type='submit' additionalStyle='w-full'>
          Log in
        </Button>
        <FormLink text='Don’t have an account?' linkText='Create account' href='/signup' />
      </form>
    </>
  );
};

export default LoginForm;
