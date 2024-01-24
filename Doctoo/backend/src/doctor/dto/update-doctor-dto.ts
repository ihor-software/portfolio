import { IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDoctorDto {
  @ApiProperty({ description: 'Specialty id', example: 1, required: false })
  @IsNumber()
  @IsOptional()
  public specialty_id?: number;

  @ApiProperty({ description: 'Doctor`s pay rate in hour', example: 10.5, required: false })
  @IsNumber()
  @IsOptional()
  public payrate?: number;

  @ApiProperty({ description: 'Is doctor available', example: false, required: false })
  @IsBoolean()
  @IsOptional()
  public available?: boolean;

  @ApiProperty({
    description: 'Id of hospital where doctor currently working',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  public hospital_id?: number;
}
