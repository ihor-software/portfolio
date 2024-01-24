import { FC, useState } from 'react';
import { InputContainer } from '../Input/Input';
import { Icon } from '../Icon/Icon';
import icons from '../Icon/iconPaths';

type SelectProps = {
  className?: string;
  label: string;
  options: string[];
  optionIcons?: string[];
  value: string;
  error?: boolean;
  helperText?: string;
  onChange?: (value: string) => void;
};

const Select: FC<SelectProps> = ({
  className = '',
  label,
  options,
  optionIcons,
  value,
  error,
  helperText,
  onChange,
}) => {
  const [openSelect, setOpenSelect] = useState(false);
  const [selectIndex, setSelectIndex] = useState(options.findIndex(item => item === value));

  const handleChange = (index: number) => {
    setSelectIndex(index);
    setOpenSelect(false);
    onChange?.(options[index]);
  };

  return (
    <div className={`relative flex flex-col gap-2 text-[#454F50]  ${className} `}>
      <InputContainer
        {...{
          error,
          helperText,
          label,
          handleClick: () => setOpenSelect(!openSelect),
          additionalClass: ' justify-between items-center',
        }}
      >
        <div className=' flex gap-2.5 items-center'>
          {optionIcons && <img src={optionIcons[selectIndex]} />}
          {options[selectIndex]}
        </div>
        <Icon src={icons.shevronMiniClosed} alt='select' />
      </InputContainer>
      {openSelect && (
        <div className='absolute translate-y-20 left-0 top-0 border rounded-md border-[#CAD7D9] overflow-hidden w-full'>
          <div className='overflow-y-auto max-h-48'>
            {options?.map((option, index) => (
              <div
                className='flex gap-2.5 items-center cursor-pointer bg-white hover:bg-[#F1F6F9] px-4 py-2 border-b-2 border-[#F1F6F9]'
                key={index}
                onClick={() => handleChange(index)}
              >
                {optionIcons && <img src={optionIcons[index]} />}
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
