import { FC, ReactNode } from 'react';
import styles from './AuthenticationPageTemplate.module.css';
import illustration from '../../images/createAccAndLoginIllustration.svg';

export type AuthenticationPageTemplatePropsType = {
  children?: ReactNode;
  forTF?: boolean;
};

const AuthenticationPageTemplate: FC<AuthenticationPageTemplatePropsType> = ({
  children,
  forTF = false,
}) => {
  return (
    <div className={`bg-white ${styles.container} ${forTF ? styles.forTF : ''}`}>
      <div className={styles.form}>{children}</div>
      <div className={styles['illustration-container']}>
        <img src={illustration} className={styles.illustration} />
      </div>
    </div>
  );
};

export default AuthenticationPageTemplate;
