import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Patient } from 'src/patient';
import { Allergy } from './allergy.entity';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class PatientsAllergies extends Model<
  InferAttributes<PatientsAllergies>,
  InferCreationAttributes<PatientsAllergies>
> {
  @ApiProperty({
    description: 'Patient id',
    example: 2,
  })
  @Column
  @ForeignKey(() => Patient)
  patient_id: number;

  @ApiProperty({
    description: 'Allergy id',
    example: 2,
  })
  @Column
  @ForeignKey(() => Allergy)
  allergy_id: number;
}
