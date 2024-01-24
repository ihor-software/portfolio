import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
  @ApiProperty({
    description: 'Patient id',
    example: 12,
  })
  @Column
  patient_id: number;

  @ApiProperty({
    description: 'Doctor id',
    example: 12,
  })
  @Column
  doctor_id: number;
}
