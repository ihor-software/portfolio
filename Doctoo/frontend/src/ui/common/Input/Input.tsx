import { FC, MouseEventHandler, forwardRef, useState } from 'react';
import styles from './Input.module.css';
import { Icon } from '../Icon/Icon';
import icons from '../Icon/iconPaths';

type InputProps = {
  label: string;
  placeholder?: string;
  value?: string | number;
  error?: boolean;
  helperText?: string;
  type?: string;
  props?: any;
  password?: boolean;
  maxlength?: number;
  onClear?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type InputContainerProps = {
  label: string;
  error?: boolean;
  helperText?: string;
  handleClick?: MouseEventHandler<HTMLDivElement>;
  additionalClass?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      value,
      error,
      helperText,
      type = 'text',
      password = false,
      maxlength,
      onClear,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(value);
    const [isTouched, setIsTouched] = useState(false);
    const [passwodrShown, setPasswordShown] = useState(false);

    const inputType = password ? (passwodrShown ? 'text' : 'password') : type;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange?.(e);
    };

    const handleClearClick = () => {
      setInputValue('');
      onClear?.();
    };

    const togglePassword = () => {
      setPasswordShown(!passwodrShown);
    };

    const shownIcon = () => {
      if (error) {
        return (
          <span onClick={password ? togglePassword : () => {}}>
            <Icon alt='warning' src={icons.warning} iconColor='fill-red' />
          </span>
        );
      } else if (password) {
        return (
          <div onClick={togglePassword} className='cursor-pointer'>
            {passwodrShown ? (
              <Icon alt='warning' src={icons.eyeOpen} className=' cursor-pointer' />
            ) : (
              <Icon alt='warning' src={icons.eyeClosed} className=' cursor-pointer' />
            )}
          </div>
        );
      } else {
        return (
          <div
            onClick={handleClearClick}
            className={`${!isTouched ? 'opacity-0' : 'cursor-pointer'}`}
          >
            <Icon src={icons.close} alt='cross' />
          </div>
        );
      }
    };

    return (
      <InputContainer {...{ label, error, helperText, handleClick: () => setIsTouched(true) }}>
        <input
          {...props}
          ref={ref}
          className={`${styles.input} focus:outline-none`}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          type={inputType}
          maxLength={maxlength}
        />
        {shownIcon()}
      </InputContainer>
    );
  },
);

Input.displayName = 'Input';

export const InputContainer: FC<InputContainerProps> = ({
  label,
  children,
  error,
  helperText,
  handleClick,
  additionalClass,
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-[#70757E]'>{label}</label>
      <div
        className={`${
          styles.input
        } rounded-lg hover:border hover:border-main focus-within:border focus-within:border-main flex gap-2 py-2 px-4 ${
          error && styles.error
        } ${additionalClass}`}
        onClick={handleClick}
      >
        {children}
      </div>
      {error && (
        <span className='text-red'>
          {helperText?.split('\n').map(text => (
            <div key={text}>{text}</div>
          ))}
        </span>
      )}
    </div>
  );
};

export default Input;
