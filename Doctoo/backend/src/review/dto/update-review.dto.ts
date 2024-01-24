import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({
    description: 'Review text',
    example: 'Super helpful and nice doctor!',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(280)
  review_text?: string;

  @ApiProperty({
    description: 'Rating',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;
}
