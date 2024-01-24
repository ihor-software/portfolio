import {
  Column,
  Model,
  Table,
  Length,
  IsEmail,
  Unique,
  Is,
  NotEmpty,
  IsIn,
  HasOne,
  Default,
  DataType,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { ApiProperty } from '@nestjs/swagger';

import { phoneValidationRegex, Role, Gender } from '../../constants';
import { Doctor } from 'src/doctor';
import { Patient } from 'src/patient';

@Table({ timestamps: false })
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @ApiProperty({ description: 'First name', example: 'John' })
  @Length({ min: 2, max: 20 })
  @Column
  public first_name: string;

  @ApiProperty({ description: 'Last name', example: 'Doe' })
  @Length({ min: 2, max: 20 })
  @Column
  public last_name: string;

  @ApiProperty({ description: 'Email', example: 'johndoe@mail.com' })
  @Length({ min: 2, max: 320 })
  @IsEmail
  @Unique
  @Column
  public email: string;

  @ApiProperty({ description: 'Phone number', example: '+380951234567' })
  @Length({ min: 2, max: 20 })
  @Is(phoneValidationRegex)
  @Unique
  @Column
  public phone_number: string;

  @ApiProperty({
    description: 'Role code',
    example: 'doctor',
    enum: Object.values(Role),
  })
  @IsIn([Object.values(Role)])
  @Column
  public role_cd: string;

  @ApiProperty({
    description: 'Gender code',
    example: 'male',
    enum: Object.values(Gender),
  })
  @IsIn([Object.values(Gender)])
  @Column
  public gender_cd: string;

  @Column
  public is_confirmed: boolean;

  @NotEmpty
  @Column
  public password: string;

  @Column
  public currentHashedRefreshToken: string;

  @Column
  public isRegisteredWithGoogle: boolean;

  @Column({ defaultValue: '' })
  twoFactorAuthenticationSecret: string;

  @Default(process.env.USER_DEFAULT_AVATAR)
  @Column({ type: DataType.TEXT })
  public avatar: string;

  @Column
  public stripeCustomerId: string;

  @HasOne(() => Doctor)
  doctor: Doctor;

  @HasOne(() => Patient)
  patient: Patient;
}
