import { useNavigate } from 'react-router-dom';
import { AuthenticationPageTemplate } from '../AuthenticationPageTemplate';
import { Button, Icon } from 'src/ui/common';
import icons from 'src/ui/common/Icon/iconPaths';
import { FormLogo } from 'src/ui/forForm/FormLogo';

const SuccessfullRegistrationPage = () => {
  const navigate = useNavigate();
  return (
    <AuthenticationPageTemplate>
      <div className='flex flex-col gap-28 items-center justify-center h-screen'>
        <FormLogo />
        <p className='text-2xl text-center'>
          <Icon src={icons.valid} alt='success' /> Verification has been completed successfully!
        </p>
        <div className='flex gap-3 justify-center'>
          <p className='text-2xl text-center'>Now you can</p>
          <Button onClick={() => navigate('/login')}> Login</Button>
        </div>
      </div>
    </AuthenticationPageTemplate>
  );
};

export default SuccessfullRegistrationPage;
