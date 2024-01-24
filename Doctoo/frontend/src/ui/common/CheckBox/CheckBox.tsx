import React, { ChangeEvent } from 'react';
import styles from './CheckBox.module.css';

interface CheckBoxProps {
  className?: string;
  id?: string;
  checked: boolean;
  disabled?: boolean;
  value: string | number;
  name: string;
  labelText: React.ReactNode;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = ({
  className,
  id,
  checked,
  disabled,
  value,
  name,
  labelText,
  onChange,
}: CheckBoxProps) => {
  return (
    <label className={`flex gap-2 p-1 ml-5 ${className} `}>
      <input
        type='checkbox'
        id={id}
        className='absolute h-[1px] w-[1px] overflow-hidden pl-6 peer'
        style={{ clip: 'rect(0 0 0 0)' }}
        checked={checked}
        disabled={disabled}
        value={value}
        name={name}
        onChange={onChange}
      />
      <span
        className={`absolute h-6 w-6 border border-main rounded hover:border-2 ml-[-34px]
        ${
          disabled
            ? 'peer-checked:before:bg-grey border-grey'
            : 'peer-checked:before:bg-main peer-focus:ring-main peer-focus:ring-2'
        }
        ${checked ? styles.checkbox_checked : ''}

        `}
      ></span>
      {labelText}
    </label>
  );
};

export default CheckBox;
