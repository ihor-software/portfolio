import { useAppSelector } from 'src/hooks/redux';
import { selectCountries } from 'src/store/slices/countries/countries.selector';

export function useCountries() {
  const countries = useAppSelector(selectCountries);
  const sortedCountries = [...countries].sort((a, b) => (a.phone_code > b.phone_code ? 1 : -1));
  const phoneCodes = sortedCountries.map(item => item.phone_code);
  const flagUrls = sortedCountries.map(item => `https://flagsapi.com/${item.code}/flat/24.png`);
  const countryNames = [...countries]
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map(item => item.name);

  return { phoneCodes, flagUrls, countryNames, countries };
}
