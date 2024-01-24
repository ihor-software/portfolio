import { ApiProperty } from '@nestjs/swagger';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Address } from 'src/address/entities/address.entity';
import { Allergy } from 'src/allergies/entities/allergy.entity';
import { PatientsAllergies } from 'src/allergies/entities/patients-allergies.entity';
import { Appointment } from 'src/appointment';
import { Doctor } from 'src/doctor';
import { MedicalCondition } from 'src/medical-conditions/entities/medical-condition.entity';
import { PatientsMedicalCond } from 'src/medical-conditions/entities/patients-medicalcond.entity';
import { Review } from 'src/review';
import { User } from 'src/user';

@Table
export class Patient extends Model<InferAttributes<Patient>, InferCreationAttributes<Patient>> {
  @ApiProperty({
    description: 'User id',
    example: 5,
  })
  @Column({ primaryKey: true })
  @ForeignKey(() => User)
  user_id: number;

  @ApiProperty({
    description: 'Patient`s height in cm',
    example: 176.5,
    required: false,
  })
  @Column({ type: DataType.FLOAT(1), allowNull: true })
  height: number;

  @ApiProperty({
    description: 'Patient`s height in kg',
    example: 63.5,
    required: false,
  })
  @Column({ type: DataType.FLOAT(1), allowNull: true })
  weight: number;

  @ApiProperty({
    description: 'Patient`s blood type',
    example: 'AB+',
    required: false,
  })
  @Column({ allowNull: true })
  bloodtype: string;

  @ApiProperty({
    description: 'Id of patient`s family doctor',
    example: 2,
    required: false,
  })
  @Column({ allowNull: true })
  @ForeignKey(() => Doctor)
  family_doctor_id: number;

  @ApiProperty({
    description: 'Patient`s declaration number',
    example: '13124135',
    required: false,
  })
  @Column({ allowNull: true })
  declaration_number: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Doctor)
  family_doctor: Doctor;

  @HasMany(() => Review)
  reviews: Review;

  @HasMany(() => Appointment)
  appointments: Appointment;

  @HasOne(() => Address)
  address: Address;

  @BelongsToMany(() => MedicalCondition, () => PatientsMedicalCond)
  medicalConditions: MedicalCondition[];

  @BelongsToMany(() => Allergy, () => PatientsAllergies)
  allergies: Allergy[];
}
