import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsIn,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus } from '../../constants';
import { Doctor } from 'src/doctor';
import { Patient } from 'src/patient';

@Table
export class Appointment extends Model<Appointment> {
  @ApiProperty({ description: 'Appointment date', example: '2016-07-16T19:20:00.000Z' })
  @Column
  public date_time: Date;

  @ApiProperty({ description: 'Appointment rating', example: '4.5' })
  @AllowNull
  @Column(DataType.FLOAT)
  public rating: number;

  @ApiProperty({ description: 'Doctor id', example: '4' })
  @ForeignKey(() => Doctor)
  @Column
  public doctor_id: number;

  @ApiProperty({ description: 'Patient id', example: '4' })
  @ForeignKey(() => Patient)
  @Column
  public patient_id: number;

  @ApiProperty({
    description: 'Appointment status code',
    example: 'Completed',
    enum: Object.values(AppointmentStatus),
    enumName: 'AppointmentStatus',
  })
  @IsIn([Object.values(AppointmentStatus)])
  @Column
  public status_cd: string;

  @Default(false)
  @Column
  public is_visited: boolean;

  @Default(false)
  @Column
  public is_paid: boolean;

  @Default(false)
  @Column
  public is_notified_time: boolean;

  @Default(false)
  @Column
  public is_notified_pay: boolean;

  @Column
  public summary: string;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @BelongsTo(() => Patient)
  patient: Patient;
}
