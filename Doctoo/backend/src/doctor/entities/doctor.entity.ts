import { ApiProperty } from '@nestjs/swagger';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user';
import { Specialty } from './speciality.entity';
import { Hospital } from './hospital.entity';
import { Patient } from 'src/patient';
import { Appointment } from 'src/appointment';
import { Review } from 'src/review';

@Table({ timestamps: false })
export class Doctor extends Model<InferAttributes<Doctor>, InferCreationAttributes<Doctor>> {
  @ApiProperty({ description: 'Id of a doctor', example: 1 })
  @Column({ primaryKey: true })
  @ForeignKey(() => User)
  user_id: number;

  @ApiProperty({ description: 'Id of a doctor`s specialty', example: 1 })
  @ForeignKey(() => Specialty)
  @Column
  specialty_id: number;

  @ApiProperty({ description: 'Doctor`s pay rate in hour', example: 100 })
  @Column({ type: DataType.DECIMAL })
  payrate: number;

  @ApiProperty({ description: 'Is doctor available now', example: true })
  @Column
  available: boolean;

  @ApiProperty({ description: 'Id of hospital where doctor currently working', example: 1 })
  @ForeignKey(() => Hospital)
  @Column
  hospital_id: number;

  @ApiProperty({
    description: 'Some information about the doctor',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  })
  @Column(DataType.TEXT)
  bio: string;

  @ApiProperty({ description: 'Time the doctor starts their working day', example: '10:30-18:00' })
  @Column
  schedule: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Hospital)
  hospital: Hospital;

  @BelongsTo(() => Specialty)
  specialty: Specialty;

  @HasMany(() => Patient)
  patient: Patient;

  @HasMany(() => Appointment)
  appointments: Appointment;

  @HasMany(() => Review)
  reviews: Review;
}
