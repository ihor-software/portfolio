import {
  IsNotEmpty,
  IsString,
  IsIn,
  IsDateString,
  IsNumber,
  IsInt,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus } from '../../constants';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'Appointment time (ISO 8601)', example: '2016-07-16T19:20:00' })
  @IsNotEmpty()
  @IsDateString()
  public date_time: Date;

  @ApiProperty({ description: 'Appointment rating', example: '4.6' })
  @IsNumber()
  @Min(0, { message: 'Value must be greater than or equal to 0' })
  @Max(5, { message: 'Value must be less than or equal to 5' })
  public rating: number;

  @ApiProperty({ description: 'Doctor id', example: '4' })
  @IsNotEmpty()
  @IsInt()
  public doctor_id: number;

  @ApiProperty({ description: 'Patient id', example: '4' })
  @IsNotEmpty()
  @IsInt()
  public patient_id: number;

  @ApiProperty({
    description: 'Appointment status code',
    example: 'Completed',
    enum: Object.values(AppointmentStatus),
    enumName: 'AppointmentStatus',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(AppointmentStatus))
  public status_cd: string;

  @ApiProperty({ description: 'Is notified about appointment?', example: 'true' })
  @IsBoolean()
  public is_notified_time?: boolean = false;

  @ApiProperty({ description: 'Is notified about payment?', example: 'true' })
  @IsBoolean()
  public is_notified_pay?: boolean = false;
}
