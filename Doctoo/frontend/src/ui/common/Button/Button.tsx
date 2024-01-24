import React, { forwardRef } from 'react';
import styles from './Button.module.css';
import { Icon } from '../Icon';

type ButtonProps = {
  variant?: 'main' | 'secondary' | 'flat' | 'error';
  icon?: string;
  disabled?: boolean;
  children?: string | React.ReactNode;
  additionalStyle?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'main',
      icon,
      disabled = false,
      children,
      additionalStyle = '',
      onClick,
      type = 'button' as const,
    },
    ref,
  ) => {
    const iconColor = variant === 'main' ? 'white' : variant === 'secondary' ? 'main' : 'icon';
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`${styles[variant]} ${additionalStyle}`}
      >
        {icon && <Icon src={icon} alt={icon} iconColor={iconColor} />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
