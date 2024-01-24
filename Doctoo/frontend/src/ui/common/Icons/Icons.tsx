import { FC } from 'react';

export type IconProps = {
  className?: string;
  onClick?: () => void;
};

export const LeftArrowIcon: FC<IconProps> = ({ className = '', onClick }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      onClick={onClick}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.7373 5.13947C15.0391 5.35902 15.0881 5.75948 14.8466 6.03392L9.59643 12L14.8466 17.9661C15.0881 18.2405 15.0391 18.641 14.7373 18.8605C14.4354 19.0801 13.9949 19.0356 13.7534 18.7611L8.15339 12.3975C7.94887 12.1651 7.94887 11.8349 8.15339 11.6025L13.7534 5.23885C13.9949 4.96441 14.4354 4.91992 14.7373 5.13947Z'
        fill='#898E96'
      />
    </svg>
  );
};

export const RightArrowIcon: FC<IconProps> = ({ className = '', onClick }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      onClick={onClick}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.2627 5.13947C9.96086 5.35902 9.91191 5.75948 10.1534 6.03392L15.4036 12L10.1534 17.9661C9.91191 18.2405 9.96086 18.641 10.2627 18.8605C10.5646 19.0801 11.0051 19.0356 11.2466 18.7611L16.8466 12.3975C17.0511 12.1651 17.0511 11.8349 16.8466 11.6025L11.2466 5.23885C11.0051 4.96441 10.5646 4.91992 10.2627 5.13947Z'
        fill='#898E96'
      />
    </svg>
  );
};

export const SearchIcon: FC<IconProps> = ({ className = '' }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M16.0482 15.0737L19 18.0248L18.0248 19L15.0737 16.0482C13.9757 16.9285 12.6099 17.4072 11.2026 17.4052C7.77877 17.4052 5 14.6265 5 11.2026C5 7.77877 7.77877 5 11.2026 5C14.6265 5 17.4052 7.77877 17.4052 11.2026C17.4072 12.6099 16.9285 13.9757 16.0482 15.0737ZM14.6657 14.5624C15.5404 13.6629 16.0289 12.4572 16.0269 11.2026C16.0269 8.53687 13.8677 6.37836 11.2026 6.37836C8.53687 6.37836 6.37836 8.53687 6.37836 11.2026C6.37836 13.8677 8.53687 16.0269 11.2026 16.0269C12.4572 16.0289 13.6629 15.5404 14.5624 14.6657L14.6657 14.5624Z'
        fill='#899596'
      />
    </svg>
  );
};

export const DropdownIcon: FC<IconProps> = ({ className = '' }) => {
  return (
    <svg
      width='8'
      height='6'
      viewBox='0 0 8 6'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M4.41603 5.37596C4.21811 5.67283 3.78189 5.67283 3.58398 5.37596L0.518233 0.777349C0.296715 0.445072 0.534911 -6.52619e-07 0.934259 -6.17707e-07L7.06574 -8.16755e-08C7.46509 -4.67634e-08 7.70329 0.445073 7.48177 0.77735L4.41603 5.37596Z'
        fill='#AFBCBD'
      />
    </svg>
  );
};
