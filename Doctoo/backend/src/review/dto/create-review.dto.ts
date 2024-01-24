import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Rating',
    example: 5,
  })
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty({ description: 'Review text', example: 'Super helpful and nice doctor!' })
  @IsString()
  @MaxLength(280)
  review_text: string;

  @ApiProperty({ description: 'Id of a patient who created review', example: 1 })
  @IsNumber()
  patient_id: number;

  @ApiProperty({ description: 'Id of a doctor about whom review written', example: 1 })
  @IsNumber()
  doctor_id: number;
}
