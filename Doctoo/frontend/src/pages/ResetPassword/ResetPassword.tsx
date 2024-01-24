import { FormLogo } from 'src/ui/forForm/FormLogo';
import { AuthenticationPageTemplate } from '../AuthenticationPageTemplate';
import { Input } from 'src/ui/common/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerValidation } from 'src/ui/RegForm/validation';
import { Button } from 'src/ui/common/Button';
import { FormTitle } from 'src/ui/forForm/FormTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import { ResetPasswordDto } from 'src/types/auth.types';
import { resetPassword } from 'src/store/services/auth.service';
import { useState } from 'react';
import { Modal } from 'src/ui/common/Modal';
import { Link } from 'react-router-dom';
import { ROUTES } from 'src/utils/routes';

export const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordDto>({
    mode: 'onSubmit',
  });
  const location = useLocation();
  const token = location.pathname.slice(16);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ResetPasswordDto> = data => {
    resetPassword({ ...data }, token).then(() => setIsModalOpened(true));
  };

  const onModalClose = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <AuthenticationPageTemplate>
      <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
        <FormLogo />
        <FormTitle
          title='Reset Password'
          subtext='Enter your new password and re-enter to confirm it'
        />
        <Input
          label='New password'
          password
          {...register('password', registerValidation.password)}
          value=''
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />
        <Input
          label='Confirm new password'
          password
          {...register('password_confirmation', registerValidation.password)}
          value=''
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />
        <Button type='submit'>Reset Password</Button>
        <Modal isOpen={isModalOpened} onClose={onModalClose}>
          <div>
            <h2 className='text-2xl font-medium leading-9'>Success!</h2>
            <p className='mt-6 mb-8'>
              Your password has been reset and now you can log in with the new one
            </p>
            <Link to={ROUTES.LOGIN}>
              <Button>Log in</Button>
            </Link>
          </div>
        </Modal>
      </form>
    </AuthenticationPageTemplate>
  );
};
