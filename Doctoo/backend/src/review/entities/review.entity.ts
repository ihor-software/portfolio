import { ApiProperty } from '@nestjs/swagger';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Doctor } from 'src/doctor';
import { Patient } from 'src/patient';

@Table
export class Review extends Model<InferAttributes<Review>, InferCreationAttributes<Review>> {
  @ApiProperty({
    description: 'Rating',
    example: 5,
  })
  @Column
  rating: number;

  @ApiProperty({ description: 'Review text', example: 'Super helpful and nice doctor!' })
  @Column
  review_text: string;

  @ApiProperty({ description: 'Id of a patient who created review', example: 1 })
  @ForeignKey(() => Patient)
  @Column
  patient_id: number;

  @ApiProperty({ description: 'Id of a doctor about whom review written', example: 1 })
  @ForeignKey(() => Doctor)
  @Column
  doctor_id: number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @BelongsTo(() => Doctor)
  doctor: Doctor;
}
