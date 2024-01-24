import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreatePatientsAllergiesDto {
  @ApiProperty({
    description: 'Patient id',
    example: 5,
  })
  @IsNumber()
  patient_id: number;

  @ApiProperty({
    description: 'Allergy id',
    example: 5,
  })
  @IsNumber()
  allergy_id: number;
}
