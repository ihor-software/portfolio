import styles from 'src/ui/forForm/FormSocialButtons/FormSocialButtons.module.css';
import { Button, Icon } from './ui/common';
import icons from './ui/common/Icon/iconPaths';
import { FC } from 'react';

export type GoogleButtonProps = {
  onSuccess?: (...args: any[]) => void;
};

const GoogleButton: FC<GoogleButtonProps> = ({ onSuccess }) => {
  return (
    <Button variant='secondary' additionalStyle='!min-w-[172px] !w-full' onClick={onSuccess}>
      <span className={styles['autoreg-button-text']}>
        <Icon src={icons.google} alt='google' />
        <span>Google</span>
      </span>
    </Button>
  );
};

export default GoogleButton;
