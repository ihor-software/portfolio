import { FC } from 'react';
import styles from './FormSeparator.module.css';

export type FormSeparatorPropsType = {
  text: string;
};

const FormSeparator: FC<FormSeparatorPropsType> = ({ text }) => {
  return (
    <div className={styles['separator-container']}>
      <span className={styles.subline}></span>
      <span className={styles.subtext}>{text}</span>
      <span className={styles.subline}></span>
    </div>
  );
};

export default FormSeparator;
