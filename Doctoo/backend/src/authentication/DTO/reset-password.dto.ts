import { IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @Length(8, 30)
  password: string;

  @IsString()
  @Length(8, 30)
  password_confirmation: string;
}
