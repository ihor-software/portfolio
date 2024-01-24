import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { Country } from 'src/countries/entities/country.entity';
import { User } from 'src/user';

export class UpdateAddressDto {
  @ApiProperty({ description: 'Country code', example: 'UA' })
  @IsOptional()
  @IsString()
  country_code: Country['code'];

  @ApiProperty({ description: 'City', example: 'Lviv' })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({ description: 'Street', example: 'Soborna' })
  @IsOptional()
  @IsString()
  street: string;

  @ApiProperty({ description: 'Zip code', example: '123456' })
  @IsOptional()
  @IsString()
  zip_code: string;

  @ApiProperty({ description: 'Appartment', example: '12A' })
  @IsOptional()
  @IsString()
  appartment?: string;

  @ApiProperty({ description: 'User id', example: '5' })
  @IsNotEmpty()
  @IsNumber()
  user_id: User['id'];
}
