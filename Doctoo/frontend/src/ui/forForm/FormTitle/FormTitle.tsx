import { FC } from 'react';
import styles from './FormTitle.module.css';

export type FormTitlePropsType = {
  title: string;
  subtext?: string;
  small?: boolean;
};

const FormTitle: FC<FormTitlePropsType> = ({ title, subtext, small = false }) => {
  return (
    <div>
      <h1 className={`${styles.title} ${small ? styles['title-small'] : ''}`}>{title}</h1>
      <span className={`${styles.subtext} ${small ? styles['subtext-small'] : ''}`}>{subtext}</span>
    </div>
  );
};

export default FormTitle;
