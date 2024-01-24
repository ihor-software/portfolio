import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class UpdatePatientConditionsDto {
  @ApiProperty({
    description: 'Allergies id list',
    example: [1, 2, 3],
    required: true,
  })
  @IsArray()
  allergies: number[];

  @ApiProperty({
    description: 'Medical conditions id list',
    example: [1, 2, 3],
    required: true,
  })
  @IsArray()
  conditions: number[];
}
