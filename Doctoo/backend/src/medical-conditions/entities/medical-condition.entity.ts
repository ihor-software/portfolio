import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Patient } from 'src/patient';
import { PatientsMedicalCond } from './patients-medicalcond.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ timestamps: false })
export class MedicalCondition extends Model<
  InferAttributes<MedicalCondition>,
  InferCreationAttributes<MedicalCondition>
> {
  @ApiProperty({
    description: 'Name of medical condition',
    example: 'Asthma',
  })
  @Column({ unique: true, type: DataType.TEXT })
  name: string;

  @BelongsToMany(() => Patient, () => PatientsMedicalCond)
  patients: Patient[];
}
