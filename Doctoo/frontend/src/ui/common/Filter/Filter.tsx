import { FC, useRef, useState } from 'react';
import { DropdownIcon } from '../Icons/Icons';
import { useClickOutside } from 'src/hooks/useClickOutside';
import styles from './Filter.module.css';
import { v4 as uuid } from 'uuid';

type FilterProps = {
  selectedValue: string | number;
  values: (string | number)[];
  onChange?: (...args: any[]) => any;
  className?: string;
  optionClasses?: string;
};

type FilterState = {
  selectedValue?: string | number;
  isOpened: boolean;
};

const initialState: FilterState = {
  isOpened: false,
};

const Filter: FC<FilterProps> = ({
  selectedValue,
  values,
  onChange,
  className = '',
  optionClasses = '',
}) => {
  const [state, setState] = useState({
    ...initialState,
    selectedValue: selectedValue ?? values[0],
  });

  const ref = useRef(null);
  useClickOutside(ref, () => setState(prevState => ({ ...prevState, isOpened: false })));

  const handleFilterOnChange = (value: string | number) => {
    setState(prevState => ({ ...prevState, selectedValue: value }));
    onChange?.(value);
  };

  return (
    <div
      ref={ref}
      className={`${styles.filter} ${className}`}
      onClick={() => setState(prevState => ({ ...prevState, isOpened: !prevState.isOpened }))}
    >
      {state.selectedValue} <DropdownIcon className='ml-5' />
      <div
        className={`options-list ${styles.dropdown} ${
          !state.isOpened ? 'hidden' : ''
        } ${optionClasses}`}
      >
        {values.map(value => (
          <span
            key={uuid()}
            onClick={() => handleFilterOnChange(value)}
            className='flex w-full hover:bg-grey-8 p-1 rounded-md pr-5'
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Filter;
