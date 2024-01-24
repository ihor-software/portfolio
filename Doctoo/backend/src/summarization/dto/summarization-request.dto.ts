import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SummarizationRequestDto {
  @ApiProperty({
    description: 'Document content',
    example: 'Asthma, heart disease, game users successfully, cough',
  })
  @IsString()
  @IsNotEmpty()
  public documentContent: string;
}
