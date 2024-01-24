import { PartialType, OmitType, IntersectionType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

import { ApiProperty } from '@nestjs/swagger';
import { Role, Gender } from 'src/constants';

export class UpdateUserDto extends PartialType(
  IntersectionType(
    OmitType(CreateUserDto, ['password', 'password_confirmation']),
    PartialType(CreateUserDto),
  ),
) {
  @ApiProperty({
    description: 'First name',
    example: 'John',
    required: false,
  })
  first_name?: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
    required: false,
  })
  last_name?: string;

  @ApiProperty({
    description: 'Email',
    example: 'johndoe@mail.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+380951234567',
    required: false,
  })
  phone_number?: string;

  @ApiProperty({
    description: 'Role code',
    example: 'doctor',
    enum: Object.values(Role),
    enumName: 'UserRole',
    required: false,
  })
  role_cd?: string;

  @ApiProperty({
    description: 'Gender code',
    example: 'male',
    enum: Object.values(Gender),
    enumName: 'UserGender',
    required: false,
  })
  gender_cd?: string;

  @ApiProperty({
    description: 'Password',
    example: 'yourPassword123',
    required: true,
  })
  password?: string;

  @ApiProperty({
    description: 'Password confirmation',
    example: 'yourPassword123',
    required: true,
  })
  password_confirmation?: string;

  @ApiProperty({
    description: 'Refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpE',
    required: false,
  })
  currentHashedRefreshToken?: string;

  @ApiProperty({
    description: 'Path to avatar image',
    example: 'avatar/164523435.jpg',
  })
  avatar?: string;
}
