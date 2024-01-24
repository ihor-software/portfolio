import { FC } from 'react';
import styles from './FormLink.module.css';
import { Link } from 'react-router-dom';

export type FormLinkPropsType = {
  text: string;
  linkText: string;
  href: string;
  small?: boolean;
  handleClick?: () => void | Promise<any>;
  disabled?: boolean;
};

const FormLink: FC<FormLinkPropsType> = ({
  text,
  linkText,
  href,
  small = false,
  handleClick,
  disabled,
}) => {
  const link = (
    <Link
      className={`${styles.link} ${small ? styles.small : ''} ${disabled ? styles.disabled : ''}`}
      to={href}
      onClick={handleClick}
    >
      {linkText}
    </Link>
  );

  return (
    <div className={styles['link-container']}>
      <span className={`${styles.subtext} ${small ? styles.small : ''}`}>
        {text}
        {small ? <span> {link}</span> : null}
      </span>
      {small ? null : link}
    </div>
  );
};

export default FormLink;
