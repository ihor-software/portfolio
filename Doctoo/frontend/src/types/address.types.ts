import { Country } from './country.types';
import { User } from 'src/types/user.types';

export type Address = {
  id: number;
  country_code: Country['code'];
  city: string;
  street: string;
  zip_code: string;
  appartment?: string;
  user_id: User['id'];
  country: { name: string };
};
