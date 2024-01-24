import { FC } from 'react';
import styles from './FormSocialButtons.module.css';
import GoogleButton from 'src/google-button';

export type FormSocialButtonsPropsType = {
  handleGoogle: () => void;
  handleFacebook?: () => void;
};

const FormSocialButtons: FC<FormSocialButtonsPropsType> = ({ handleGoogle }) => {
  return (
    <div className={styles['autoreg-buttons']}>
      <GoogleButton onSuccess={handleGoogle} />
    </div>
  );
};

export default FormSocialButtons;
