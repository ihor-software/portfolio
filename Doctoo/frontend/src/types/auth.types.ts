export type ForgotPasswordDto = {
  email: string;
};

export type ResetPasswordDto = {
  password: string;
  password_confirmation: string;
};
