import { FC, useEffect, useRef, useState } from 'react';
import styles from './TwoFactorForm.module.css';
import FormLink from '../forForm/FormLink/FormLink';
import { Button } from '../common/Button';
import TwoFactorInput from '../forForm/TwoFactorInput/TwoFactorInput';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/utils/routes';
import { userAPI } from 'src/store/services/api/userAPI';
import { setMessage } from 'src/store/slices/systemMessage.slice';
import { getUserThunk } from 'src/store/slices/auth';
import { useAppDispatch } from 'src/hooks/redux';

type TwoFactorFormTypes = {
  enable?: boolean;
  current2fa?: boolean;
  userId: number;
  handleResendCode: () => Promise<any>;
};

const TwoFactorForm: FC<TwoFactorFormTypes> = ({
  enable = false,
  current2fa,
  userId,
  handleResendCode,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [code, setCode] = useState('');

  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleVerify = async (): Promise<any> => {
    try {
      const { status } = await userAPI.verifyOtp(code, userId);
      if (status === 201) {
        dispatch(getUserThunk());
        navigate('/');
        dispatch(
          setMessage({
            message: 'You are successfully logged in to website',
            status: 'success',
          }),
        );
      }
    } catch (err: any) {
      setCode('');
      dispatch(
        setMessage({
          message: err.message,
          status: 'error',
        }),
      );
    }
  };

  const handleEnable = async (): Promise<any> => {
    try {
      const { status } = await userAPI.toggle2fa(code);
      if (status === 201) {
        dispatch(
          setMessage({
            message: `Two-factor authentication was successfully ${
              !current2fa ? 'en' : 'dis'
            }abled`,
            status: 'success',
          }),
        );
        navigate('/settings');
      }
    } catch (err) {
      setCode('');
    }
  };

  const handleBack = (): void => {
    navigate(-1);
  };

  useEffect(() => {
    if (code.length === 6) {
      setIsDisabled(false);
    } else if (isDisabled === false) {
      setIsDisabled(true);
    }
  }, [code]);

  useEffect(() => {
    if (isDisabled === false) {
      buttonRef.current?.focus();
    }
  }, [isDisabled]);

  return (
    <form className={styles['form-container']}>
      <TwoFactorInput setCode={setCode} />
      {!enable && (
        <FormLink
          small
          text='Please check saved passwords in your phone or Google Authenticator. Have lost data?'
          linkText='Generate a new code'
          href='#'
          handleClick={handleResendCode}
        />
      )}
      <div className={styles['autoreg-buttons']}>
        <Button variant='secondary' additionalStyle={styles.button} onClick={handleBack}>
          Back
        </Button>
        <Button
          disabled={isDisabled}
          additionalStyle={styles.button}
          onClick={enable ? handleEnable : handleVerify}
          ref={buttonRef}
        >
          Submit
        </Button>
      </div>
      {!enable && (
        <FormLink text='Don’t have an account?' linkText='Create account' href={ROUTES.SIGNUP} />
      )}
    </form>
  );
};

export default TwoFactorForm;
