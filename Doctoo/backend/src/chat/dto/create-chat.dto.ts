import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({
    description: 'Patient id',
    example: 5,
  })
  @IsNumber()
  patient_id: number;

  @ApiProperty({
    description: 'Doctor id',
    example: 5,
  })
  @IsNumber()
  doctor_id: number;
}
