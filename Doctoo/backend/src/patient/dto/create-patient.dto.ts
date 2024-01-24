import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    description: 'User id',
    example: 5,
  })
  @IsNumber()
  user_id: number;
}
