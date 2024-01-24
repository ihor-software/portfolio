import axios from 'axios';
import { Address } from 'src/types/address.types';
import { User } from 'src/types/user.types';

export const fetchAddresses = async (id: User['id'] | undefined) => {
  return axios.get<Address[]>(`/api/v1/address/${id}`);
};

export const postAddress = async (data: Omit<Address, 'id' | 'country'>) => {
  return axios.post<Address>(`/api/v1/address`, data);
};

export const patchAddress = async (
  id: Address['id'] | undefined,
  data: Omit<Address, 'id' | 'country'>,
) => {
  return axios.patch<Address>(`/api/v1/address/${id}`, data);
};
