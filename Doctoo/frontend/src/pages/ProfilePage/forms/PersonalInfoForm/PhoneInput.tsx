import Select from 'src/ui/common/Select/Select';
import { splitPhoneNumber } from './helpers';
import { Input } from 'src/ui/common/Input';
import { useCountries } from './useCountries';

interface PhoneInputProps {
  className?: string;
  value: string;
  error?: boolean;
  helperText?: string;
  onChange?: (value: string) => void;
}

export function PhoneInput({
  className = '',
  value,
  error,
  helperText,
  onChange,
}: PhoneInputProps) {
  const { phoneCodes, flagUrls } = useCountries();
  const [prefix, number] = splitPhoneNumber(phoneCodes, value);

  const handlePrefixChange = (newPrefix: string) => {
    onChange?.(newPrefix + number);
  };

  const handleNumberChange = (newNumber = '') => {
    onChange?.(prefix + newNumber);
  };

  return (
    <div className={className}>
      <div className='flex items-end gap-2'>
        <Select
          className='basis-2/5'
          label='Phone'
          options={phoneCodes}
          optionIcons={flagUrls}
          value={prefix}
          error={error}
          onChange={handlePrefixChange}
        />

        <Input
          type='tel'
          label=''
          value={number}
          error={error}
          onChange={e => handleNumberChange(e.target.value)}
          onClear={handleNumberChange}
        />
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
}
