import { FC, useEffect, useState } from 'react';
import { AuthenticationPageTemplate } from '../AuthenticationPageTemplate';
import TwoFactorForm from 'src/ui/TwoFactorForm/TwoFactorForm';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSetting } from 'src/store/slices/auth/auth.slice';
import { userAPI } from 'src/store/services/api/userAPI';
import { FormLogo } from 'src/ui/forForm/FormLogo';
import { FormTitle } from 'src/ui/forForm/FormTitle';
import styles from '../../ui/TwoFactorForm/TwoFactorForm.module.css';
import { useLocation } from 'react-router-dom';
import { setMessage } from 'src/store/slices/systemMessage.slice';

const TwoFactorAuthPage: FC = () => {
  const userSettings = useSelector(getUserSetting);
  const dispatch = useDispatch();
  const location = useLocation();

  const [qr, setQr] = useState('');
  const [locationData] = useState(location.state);

  const generateQrOtp = async (): Promise<any> => {
    try {
      const { data } = await userAPI.sendOtp(locationData.email, locationData.password);
      setQr(data.otpauthUrl);
    } catch (err: any) {
      dispatch(setMessage({ message: err.message, status: 'error' }));
    }
  };

  useEffect(() => {
    if (!userSettings?.isTwoFactor && !(locationData?.userId >= 0)) {
      generateQrOtp();
    }
  }, []);

  return (
    <AuthenticationPageTemplate forTF>
      <div className={styles['form-container']}>
        <FormLogo />
        <FormTitle
          small
          title='Authenticate Your Account'
          subtext={`Protecting your account is our top priority. Please confirm your account by entering the authorization code ${
            qr
              ? 'through scanning QR-code bellow with your camera or Google Authenticator app'
              : 'which is saved in your Google Authenticator'
          }`}
        />
        {qr && <img src={qr} alt='QR-Code' className='w-52 mx-auto my-3' />}
        <TwoFactorForm
          enable={locationData?.enable}
          current2fa={userSettings?.isTwoFactor}
          userId={locationData?.userId || userSettings?.user_id}
          handleResendCode={generateQrOtp}
        />
      </div>
    </AuthenticationPageTemplate>
  );
};

export default TwoFactorAuthPage;
