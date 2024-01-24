import { Patient } from './patient.types';

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone_number?: string;
  role_cd?: string;
  gender_cd?: string;
  is_confirmed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  patient?: Patient;
  currentHashedRefreshToken?: string;
  isRegisteredWithGoogle?: boolean;
  avatar: string;
};

export const castToUser = async (object?: any): Promise<User | undefined> => {
  if (object) {
    return {
      id: object.user_id ?? 0,
      first_name: object.first_name ?? '',
      last_name: object.last_name ?? '',
      email: object.email ?? '',
      phone_number: object.phone_number ?? '',
      role_cd: object.role_cd ?? '',
      gender_cd: object.gender_cd ?? '',
      is_confirmed: object.is_confirmed ?? false,
      currentHashedRefreshToken: object.currentHashedRefreshToken,
      isRegisteredWithGoogle: object.isRegisteredWithGoogle,
      avatar: object.avatar,
    };
  }
};

export type UserSettings = {
  user_id: number;
  isEmailNotification: boolean;
  isTwoFactor: boolean;
  isRequiredBillApproval: boolean;
};
