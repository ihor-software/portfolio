import { FC } from 'react';
import styles from './RegForm.module.css';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { FormLogo } from '../forForm/FormLogo';
import { FormTitle } from '../forForm/FormTitle';
import FormLinks from '../forForm/FormLink/FormLink';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { registerValidation } from './validation';
import { useAppDispatch } from 'src/hooks/redux';
import { registerSliceActions } from 'src/store/slices/registerSlice';
import Select from '../common/Select/Select';
import { FormSocialButtons } from '../forForm/FormSocialButtons';
import { FormSeparator } from '../forForm/FormSeparator';
import useGoogleAuthentication from 'src/use-google-authentication';
import { useGoogleLogin } from '@react-oauth/google';
import { createPatient, registerUser } from 'src/store/services';
import { setMessage } from 'src/store/slices/systemMessage.slice';
import { useNavigate } from 'react-router-dom';
import { getUserThunk } from 'src/store/slices/auth';

export type RegInputsType = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  gender_cd: string;
  password: string;
  password_confirmation: string;
};

const RegForm: FC = () => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<RegInputsType>({
    mode: 'onSubmit',
  });

  const { handleSignUp, handleSignIn } = useGoogleAuthentication();
  const navigate = useNavigate();
  const signUp = useGoogleLogin({
    onSuccess: tokenResponse =>
      handleSignUp(
        tokenResponse,
        () =>
          handleSignIn(
            tokenResponse,
            () => {
              dispatch(getUserThunk());
              navigate('/dashboard');
            },
            () =>
              dispatch(
                setMessage({ message: 'Sign in error. Wrong user credentials!', status: 'error' }),
              ),
          ),
        () =>
          dispatch(
            setMessage({
              message: `Sign up error. User with such email already exists!`,
              status: 'error',
            }),
          ),
      ),
  });

  const genderController = useController({
    name: 'gender_cd',
    control,
    rules: {
      ...registerValidation.gender_cd,
    },
  });

  const dispatch = useAppDispatch();
  const { openModal } = registerSliceActions;

  const onSubmit: SubmitHandler<RegInputsType> = async data => {
    const reqBody = { ...data, role_cd: 'patient', is_confirmed: false };
    try {
      const response = await registerUser(reqBody);
      if (response.status === 201) {
        dispatch(openModal());
        await createPatient(response.data.user.id);
      } else {
        setError('root.serverError', {
          type: response.status.toString(),
          message: response.statusText,
        });
      }
    } catch (error: any) {
      dispatch(setMessage({ message: error.response.data.message, status: 'error' }));
    }
  };
  return (
    <>
      <form className={styles['form-container']} onSubmit={handleSubmit(onSubmit)}>
        <FormLogo />
        <FormTitle title='Create account' subtext='Select a method to create account:' />
        <FormSocialButtons handleGoogle={() => signUp()} />
        <FormSeparator text='or continue with email' />
        {errors.root?.serverError.type === 400 && (
          <p className='text-red'> {errors.root.serverError.message}</p>
        )}
        {errors.root?.serverError.type === 500 && (
          <p className='text-red'> {errors.root.serverError.message}</p>
        )}
        <div className={styles.inputGroup}>
          <Input
            label='Name'
            {...register('first_name', registerValidation.first_name)}
            value=''
            error={Boolean(errors.first_name)}
            helperText={errors.first_name?.message}
          />
          <Input
            label='Surname'
            {...register('last_name', registerValidation.last_name)}
            value=''
            error={Boolean(errors.last_name)}
            helperText={errors.last_name?.message}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            label='Phone number'
            {...register('phone_number', registerValidation.phone_number)}
            value=''
            error={Boolean(errors.phone_number)}
            helperText={errors.phone_number?.message}
          />
          <Input
            label='Email'
            {...register('email', registerValidation.email)}
            value=''
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
        </div>
        <Select
          label='Gender'
          options={['female', 'male']}
          helperText={errors.gender_cd?.message}
          value={genderController.field.value}
          onChange={genderController.field.onChange}
          error={genderController.fieldState.invalid}
        />
        <div className={styles.inputGroup}>
          <Input
            label='Password'
            password
            {...register('password', registerValidation.password)}
            value=''
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          <Input
            label='Repeat password'
            password
            {...register('password_confirmation', registerValidation.password_confirmation)}
            value=''
            error={Boolean(errors.password_confirmation)}
            helperText={errors.password_confirmation?.message}
          />
        </div>
        <Button type='submit' additionalStyle='w-full'>
          Create acccount
        </Button>
        <FormLinks text='Already have an account?' linkText='Log in' href='/login' />
      </form>
    </>
  );
};

export default RegForm;
