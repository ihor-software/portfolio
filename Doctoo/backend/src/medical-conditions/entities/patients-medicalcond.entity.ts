import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { AllowNull, Column, Default, ForeignKey, Model, Table } from 'sequelize-typescript';
import { MedicalCondition } from './medical-condition.entity';
import { Patient } from 'src/patient';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class PatientsMedicalCond extends Model<
  InferAttributes<PatientsMedicalCond>,
  InferCreationAttributes<PatientsMedicalCond>
> {
  @ApiProperty({
    description: 'Medical condition id',
    example: 2,
  })
  @Default(null)
  @AllowNull
  @Column
  @ForeignKey(() => MedicalCondition)
  medical_condition_id: number;

  @ApiProperty({
    description: 'Patient id',
    example: 4,
  })
  @Column
  @ForeignKey(() => Patient)
  patient_id: number;

  @AllowNull
  @Column
  description: string;
}
