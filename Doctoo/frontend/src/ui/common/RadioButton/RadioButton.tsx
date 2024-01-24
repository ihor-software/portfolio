import { ChangeEvent } from 'react';

interface RadioButtonProps {
  id: string;
  checked: boolean;
  disabled?: boolean;
  value: string | number;
  name: string;
  labelText: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = ({
  id,
  checked,
  disabled,
  value,
  name,
  labelText,
  onChange,
}: RadioButtonProps) => {
  return (
    <label htmlFor={id} className={`p-1 ml-5 ${disabled ? 'text-grey' : ''}`}>
      <input
        id={id}
        className='absolute h-[1px] w-[1px] overflow-hidden pl-6 peer'
        style={{ clip: 'rect(0 0 0 0)' }}
        type='radio'
        checked={checked}
        disabled={disabled}
        value={value}
        name={name}
        onChange={onChange}
      />
      <span
        className={`absolute h-6 w-6 border border-main rounded-xl hover:border-2 ml-[-34px]
      ${
        disabled
          ? 'peer-checked:before:bg-grey border-grey'
          : 'peer-checked:before:bg-main   peer-focus:ring-main peer-focus:ring-2 '
      }
      ${
        checked
          ? 'before:w-[14px] before:h-[14px] before:rounded-xl before:absolute before:top-1/2 before:left-1/2 before:translate-x-[-50%] before:translate-y-[-50%]'
          : ''
      }
    `}
      ></span>
      {labelText}
    </label>
  );
};

export default RadioButton;
