import React, { FC } from 'react';
import styles from './Tag.module.css';

export enum TagTextType {
  Primary = 'primary',
  Secondary = 'secondary',
  Info = 'info',
  Error = 'error',
}

export type TagPropsType = {
  text: string;
  variant?: TagTextType;
  onClose?: () => void;
  additionalClasses?: string[];
  textColor?: string;
  additionalElement?: React.ReactNode;
};

const CloseIcon = () => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.16272 7.16272C7.37968 6.94576 7.73143 6.94576 7.94839 7.16272L12 11.2143L16.0516 7.16272C16.2686 6.94576 16.6203 6.94576 16.8373 7.16272C17.0542 7.37968 17.0542 7.73143 16.8373 7.94839L12.7857 12L16.8373 16.0516C17.0542 16.2686 17.0542 16.6203 16.8373 16.8373C16.6203 17.0542 16.2686 17.0542 16.0516 16.8373L12 12.7857L7.94839 16.8373C7.73143 17.0542 7.37968 17.0542 7.16272 16.8373C6.94576 16.6203 6.94576 16.2686 7.16272 16.0516L11.2143 12L7.16272 7.94839C6.94576 7.73143 6.94576 7.37968 7.16272 7.16272Z'
        fill='#707D7E'
      />
    </svg>
  );
};

const Tag: FC<TagPropsType> = ({
  text,
  variant = TagTextType.Primary,
  onClose = null,
  additionalClasses,
  textColor,
  additionalElement,
}) => {
  const getClass = (variant: TagTextType): string => {
    switch (variant) {
      case TagTextType.Secondary:
        return styles.secondary;
      case TagTextType.Info:
        return styles.info;
      case TagTextType.Error:
        return styles.error;
      default:
        return '';
    }
  };

  const getIconClass = (variant: TagTextType): string =>
    variant === TagTextType.Secondary ? styles['icon-secondary'] : styles['icon-base'];

  return (
    <>
      <div className={`${styles.container} ${getClass(variant)} ${additionalClasses?.join(' ')}`}>
        <span className={`${styles.text} ${textColor} ${getClass(variant)}`}>{text}</span>
        {onClose ? (
          <div onClick={onClose} className={`cursor-pointer ${getIconClass(variant)}`}>
            <CloseIcon />
          </div>
        ) : null}
        {additionalElement}
      </div>
    </>
  );
};

export default Tag;
