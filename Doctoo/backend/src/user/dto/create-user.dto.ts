import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  IsIn,
  Matches,
  IsBoolean,
  IsEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { phoneValidationRegex, Role, Gender } from '../../constants';

export class CreateUserDto {
  @ApiProperty({ description: 'First name', example: 'John' })
  @IsString()
  @Length(2, 20)
  public first_name: string;

  @ApiProperty({ description: 'Last name', example: 'Doe' })
  @IsString()
  @Length(2, 20)
  public last_name: string;

  @ApiProperty({ description: 'Email', example: 'johndoe@mail.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty({ description: 'Phone number', example: '+380951234567' })
  @IsString()
  @Matches(phoneValidationRegex)
  @IsNotEmpty()
  public phone_number: string;

  @ApiProperty({
    description: 'Role code',
    example: 'doctor',
    enum: Object.values(Role),
    enumName: 'UserRole',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(Role))
  public role_cd: string;

  @ApiProperty({
    description: 'Gender code',
    example: 'male',
    enum: Object.values(Gender),
    enumName: 'UserGender',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(Gender))
  public gender_cd: string;

  @ApiProperty({
    description:
      'If true - user registration was verified with email link, otherwise user didn`t confirm registration via email link',
    example: false,
  })
  @IsNotEmpty()
  public is_confirmed: boolean;

  @ApiProperty({ description: 'Password', example: 'yourPassword123' })
  @IsString()
  @Length(8, 30)
  public password: string;

  @ApiProperty({ description: 'Password confirmation', example: 'yourPassword123' })
  @IsString()
  @Length(8, 30)
  public password_confirmation: string;

  @ApiProperty({ description: 'Is registered with google', example: 'true' })
  public isRegisteredWithGoogle: boolean;

  @ApiProperty({ description: 'Avatar', example: 'https://lh3.googleusercontent.com/a/125125' })
  public avatar?: string;
}
