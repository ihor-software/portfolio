import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsDate,
  IsDateString,
  IsOptional,
  validate,
  IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Chat id',
    example: 5,
  })
  @IsNumber()
  chat_id: number;

  @ApiProperty({
    description: 'Message text',
    example: 'test',
  })
  @IsString()
  message_text: string;

  @ApiProperty({
    description: 'File link',
    example: 'file_data.png',
  })
  @IsString()
  file: string;

  @ApiProperty({ description: 'Message Date', example: '2023-12-12T13:00:00Z' })
  @IsDateString()
  timestamp: string;

  @ApiProperty({ description: 'User id', example: 1 })
  @IsNumber()
  user_id: number;

  async validate() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed', JSON.stringify(errors));
    }
  }
}
