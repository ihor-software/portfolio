import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AppointmentSummaryDto {
  @ApiProperty({
    description: 'Doctor clinical note',
    example: 'The patient complained of back, head and leg pain. A full body X-ray is required.',
  })
  @IsString()
  @IsNotEmpty()
  public doctorNote: string;

  @ApiProperty({
    description: 'Appointment id',
    example: '1',
  })
  @IsNumber()
  @IsNotEmpty()
  public appointment_id: number;

  @ApiProperty({
    description: 'Summary',
  })
  @IsObject()
  public summary: any;
}
