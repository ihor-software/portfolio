import { Country } from 'src/types/country.types';

export function splitPhoneNumber(phoneCodes: Country['phone_code'][], fullNumber = '') {
  for (let len = 5; len >= 2; len -= 1) {
    const prefix = fullNumber.slice(0, len);
    if (phoneCodes.includes(prefix)) {
      return [prefix, fullNumber.slice(len)];
    }
  }
  return ['', fullNumber];
}
