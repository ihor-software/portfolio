import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import icons from 'src/ui/common/Icon/iconPaths';
import { AuthenticationPageTemplate } from '../AuthenticationPageTemplate';
import { FormLogo } from 'src/ui/forForm/FormLogo';
import { Button } from 'src/ui/common';

const VerifyRegistrationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  console.log(token);

  const sendVerificationToken = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/v1/authentication/verify/${token}`, {
        method: 'POST',
      });

      if (response.status === 201) {
        navigate('/register-success', { replace: true });
      }
    } catch (error) {
      console.log('Error', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sendVerificationToken();
  }, []);

  return (
    <AuthenticationPageTemplate>
      <div className='px-5 flex flex-col gap-40 justify-center items-center h-screen'>
        <FormLogo />
        {isLoading ? <VerifyRegistrationPagePending /> : <VerifyRegistrationPageError />}
      </div>
    </AuthenticationPageTemplate>
  );
};

export const VerifyRegistrationPagePending = () => {
  return (
    <div className='flex flex-col mx-auto items-center justify-center '>
      <p className='text-3xl'> Verifying your email</p>
      <img src={icons.spinner} alt='spinner' className='animate-spin-slow object-fill h-28 w-28 ' />
    </div>
  );
};
export const VerifyRegistrationPageError = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col mx-auto items-center justify-center gap-10'>
      <p className='text-2xl text-center'>
        {' '}
        Some error has been occurred. You can try sing up again
      </p>
      <Button onClick={() => navigate('/signup')}>Sign up</Button>
    </div>
  );
};
export default VerifyRegistrationPage;
