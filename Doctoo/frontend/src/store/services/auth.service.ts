import axios from 'axios';
import { ForgotPasswordDto, ResetPasswordDto } from 'src/types/auth.types';
import { User, UserSettings } from 'src/types/user.types';
import { Allergy } from 'src/types/allergy.types';
import { Condition } from 'src/types/condition.types';
import { Patient } from '../slices/auth';

interface IregisterUser {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  gender_cd: string;
  password: string;
  password_confirmation: string;
}
const registerUser = async (data: IregisterUser) => {
  const response = await axios.post<{ message: string; user: User }>(
    `/api/v1/authentication/signup/`,
    data,
  );
  return response;
};

interface IloginUser {
  email: string;
  password: string;
}

const loginUser = async (data: IloginUser) => {
  const response = await fetch(`/api/v1/authentication/log-in/`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ ...data }),
  });
  return response;
};

const forgotPassword = async (data: ForgotPasswordDto) => {
  return axios.post('/api/v1/authentication/forgot-password/', data);
};

const resetPassword = async (data: ResetPasswordDto, token: string) => {
  return axios.post(`/api/v1/authentication/reset-password/${token}`, data);
};

const getUser = async () => {
  return axios.get<{ user: User; settings: UserSettings }>('/api/v1/authentication', {
    withCredentials: true,
  });
};

const logout = async () => {
  return axios.delete('/api/v1/authentication/logout', { withCredentials: true });
};

const patchUser = async (id: User['id'] | undefined, updatedUser: Partial<User>) => {
  return axios.patch<User>(`/api/v1/users/${id}`, updatedUser);
};

const patchPatientConditions = async (
  id: User['id'] | undefined,
  data: { allergies: Allergy['id'][]; conditions: Condition['id'][] },
) => {
  return axios.patch<Patient>(`/api/v1/patients/${id}/conditions`, data);
};

export {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  getUser,
  logout,
  patchUser,
  patchPatientConditions,
};
