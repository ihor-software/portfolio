import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Country } from 'src/countries/entities/country.entity';
import { User } from 'src/user/entities';

export class CreateAddressDto {
  @ApiProperty({ description: 'Country code', example: 'UA' })
  @IsNotEmpty()
  @IsString()
  country_code: Country['code'];

  @ApiProperty({ description: 'City', example: 'Lviv' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ description: 'Street', example: 'Soborna' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ description: 'Zip code', example: '123456' })
  @IsNotEmpty()
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
