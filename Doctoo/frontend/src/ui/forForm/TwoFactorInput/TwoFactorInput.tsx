import {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './TwoFactorInput.module.css';

type ValuesType = {
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
  sixth: string;
};

export type TwoFactorInputPropsType = {
  setCode: Dispatch<SetStateAction<string>>;
};

const firstHalf: Array<keyof ValuesType> = ['first', 'second', 'third'];
const secondHalf: Array<keyof ValuesType> = ['fourth', 'fifth', 'sixth'];
const arrayOfKeys = [...firstHalf, ...secondHalf];
const initialValues = {
  first: '_',
  second: '_',
  third: '_',
  fourth: '_',
  fifth: '_',
  sixth: '_',
};

const TwoFactorInput: FC<TwoFactorInputPropsType> = ({ setCode }) => {
  const [values, setValues] = useState<ValuesType>(initialValues);
  const [activeInput, setActiveInput] = useState<keyof ValuesType>('first');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: keyof ValuesType): void => {
    const newValue = e.target.value.replace(values[index], '');
    if (newValue === '' || !isNaN(Number(newValue))) {
      setValues(prev => ({
        ...prev,
        [index]: newValue === '' ? '_' : newValue,
      }));
      if (!newValue) {
        setActiveInput(arrayOfKeys[arrayOfKeys.indexOf(index) - 1]);
      } else {
        setActiveInput(arrayOfKeys[arrayOfKeys.indexOf(index) + 1]);
      }
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: keyof ValuesType) => {
    ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
    if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
      setActiveInput(arrayOfKeys[arrayOfKeys.indexOf(index) - 1]);
    } else if (e.key === 'ArrowRight') {
      setActiveInput(arrayOfKeys[arrayOfKeys.indexOf(index) + 1]);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeInput]);

  useEffect(() => {
    const finalString = arrayOfKeys.reduce((accum, value) => {
      if (!isNaN(Number(values[value]))) {
        return accum + values[value];
      } else {
        return accum;
      }
    }, '');
    if (finalString.length === 6) {
      setCode(finalString);
    } else {
      setCode('');
    }
  }, [values]);

  const numInput = (value: keyof ValuesType, index: number) => {
    return (
      <input
        ref={value === activeInput ? inputRef : null}
        key={index}
        type='text'
        value={values[value]}
        className={`${styles.input} ${values[value] === '_' ? styles.dash : ''}`}
        onChange={e => handleChange(e, value)}
        onKeyDown={e => onKeyDown(e, value)}
      />
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        {firstHalf.map((value, index) => numInput(value, index))}
      </div>
      <div className={styles.subcontainer}>
        {secondHalf.map((value, index) => numInput(value, index))}
      </div>
    </div>
  );
};

export default TwoFactorInput;
