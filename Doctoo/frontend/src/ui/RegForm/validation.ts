import { RegisterOptions } from 'react-hook-form';
import { RegInputsType } from './RegForm';

export type ConvertToRegisterOptions<T> = {
  [K in keyof T]: RegisterOptions;
};

const nameMessage = 'Please, enter a valid name and surname';
const emailMessage = 'Please, enter the correct email';
const passwordMessage =
  '• Password must be at least 8 characters long\n• Only latin letters allowed\n• Uppercase and lowercase letters\n• Password must include at least 1 number';

const passwordRepeatMessage = 'Passwords should math each other';

export const registerValidation: ConvertToRegisterOptions<RegInputsType> = {
  first_name: {
    required: nameMessage,
    pattern: {
      value: /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)?(?:\s[A-Z][a-z]+)?$/,
      message: nameMessage,
    },
  },
  last_name: {
    required: nameMessage,
    pattern: {
      value: /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)?(?:\s[A-Z][a-z]+)?$/,
      message: nameMessage,
    },
  },
  email: {
    required: emailMessage,
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      message: emailMessage,
    },
  },
  phone_number: {
    required: 'Please enter your phone number',
    pattern: {
      value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      message: 'Please enter valid phone number, f.e. - +380504321549',
    },
  },
  gender_cd: {
    required: 'Enter your gender',
  },
  password: {
    required: passwordMessage,
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message: passwordMessage,
    },
  },

  password_confirmation: {
    required: passwordMessage,
    validate: (value, allValues) => {
      return value === allValues.password || passwordRepeatMessage;
    },
  },
};
