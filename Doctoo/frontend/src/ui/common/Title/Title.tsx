import { FC, ReactNode } from 'react';
import styles from './Title.module.css';

export type TitleProps = {
  titleIcon?: ReactNode;
  title: string;
  titleFontSize?: number;
  titleFontWeight?:
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black';
  children?: ReactNode | ReactNode[];
  className?: string;
};

const Title: FC<TitleProps> = ({
  titleIcon,
  title,
  children,
  className = '',
  titleFontSize = 24,
  titleFontWeight = 'normal',
}) => {
  return (
    <header className={`${styles['title-container']} ${className}`}>
      <div className={styles['title']}>
        {titleIcon}
        <span
          className={`${titleIcon ? 'ml-3' : ''} font-${titleFontWeight}`}
          style={{ fontSize: titleFontSize }}
        >
          {title}
        </span>
      </div>
      <div className='controls'>{children}</div>
    </header>
  );
};

export default Title;
