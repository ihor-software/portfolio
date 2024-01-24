import { FC } from 'react';
import { Icon } from 'src/ui/common/Icon';
import icons from 'src/ui/common/Icon/iconPaths';
import styles from './FormLogo.module.css';

const FormLogo: FC = () => {
  return (
    <div className={styles['logo-container']}>
      <Icon src={icons.logogreen} alt='doctoo' />
      <span className={styles['logo-text']}>DOCTOO</span>
    </div>
  );
};

export default FormLogo;
