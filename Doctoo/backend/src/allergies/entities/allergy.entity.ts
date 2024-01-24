import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Patient } from 'src/patient';
import { PatientsAllergies } from './patients-allergies.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ timestamps: false })
export class Allergy extends Model<InferAttributes<Allergy>, InferCreationAttributes<Allergy>> {
  @ApiProperty({
    description: 'Name of allergy',
    example: 'Mustard',
  })
  @Column({ unique: true })
  name: string;

  @BelongsToMany(() => Patient, () => PatientsAllergies)
  patients: Patient[];
}
