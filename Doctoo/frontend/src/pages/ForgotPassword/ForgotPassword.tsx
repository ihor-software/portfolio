import { FormLogo } from 'src/ui/forForm/FormLogo';
import { AuthenticationPageTemplate } from '../AuthenticationPageTemplate';
import { Input } from 'src/ui/common/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerValidation } from 'src/ui/RegForm/validation';
import { Button } from 'src/ui/common/Button';
import FormLink from 'src/ui/forForm/FormLink/FormLink';
import { useState } from 'react';
import { ForgotPasswordDto } from 'src/types/auth.types';
import { Modal } from 'src/ui/common/Modal';
import { ROUTES } from 'src/utils/routes';
import { forgotPassword } from 'src/store/services/auth.service';

export const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordDto>({
    mode: 'onSubmit',
  });
  const [isModalOpened, setIsModalOpened] = useState(false);

  const onSubmit: SubmitHandler<ForgotPasswordDto> = data => {
    forgotPassword({ ...data }).then(() => setIsModalOpened(true));
  };

  return (
    <AuthenticationPageTemplate>
      <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
        <FormLogo />
        <p className='text-grey-1'>
          Enter the email address associated with your account and we will send you a link to reset
          your password
        </p>
        <Input
          label='Email'
          {...register('email', registerValidation.email)}
          value=''
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
        <Button type='submit'>Continue</Button>
        <FormLink text='Don’t have an account?' linkText='Create account' href={ROUTES.SIGNUP} />
        <Modal isOpen={isModalOpened} onClose={() => setIsModalOpened(false)}>
          <div>
            <h2 className='text-2xl font-medium leading-9'>Success!</h2>
            <p className='mt-6 mb-8'>The link to reset your password has been sent on your email</p>
            <Button onClick={handleSubmit(onSubmit)}>Resend</Button>
          </div>
        </Modal>
      </form>
    </AuthenticationPageTemplate>
  );
};
