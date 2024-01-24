import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePatientsMedicalCondDto {
  @ApiProperty({
    description: 'Patient id',
    example: 5,
  })
  @IsNumber()
  patient_id: number;

  @ApiProperty({
    description: 'Medical condition id',
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  medical_condition_id: number;

  @IsString()
  @IsOptional()
  description: string;
}
