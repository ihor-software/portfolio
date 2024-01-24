import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdatePatientDto {
  @ApiProperty({
    description: 'Patient`s height in cm',
    example: 176.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  height?: number;

  @ApiProperty({
    description: 'Patient`s height in kg',
    example: 63.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  weight?: number;

  @ApiProperty({
    description: 'Patient`s blood type',
    example: 'AB+',
    required: false,
  })
  @IsOptional()
  @IsString()
  bloodtype?: string;

  @ApiProperty({
    description: 'Id of patient`s family doctor',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  family_doctor_id?: number;

  @ApiProperty({
    description: 'Patient`s declaration number',
    example: '13124135',
    required: false,
  })
  @IsOptional()
  @IsString()
  declaration_number?: string;
}
