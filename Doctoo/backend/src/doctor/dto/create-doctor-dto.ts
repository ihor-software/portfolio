import { IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({ description: 'Doctor id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: 'Specialty id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  specialty_id: number;

  @ApiProperty({ description: 'Doctor`s pay rate in hour', example: 10.5 })
  @IsNumber()
  @IsNotEmpty()
  payrate: number;

  @ApiProperty({ description: 'Is doctor available', example: false })
  @IsBoolean()
  @IsNotEmpty()
  available: boolean;

  @ApiProperty({ description: 'Id of hospital where doctor currently working', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  hospital_id: number;
}
