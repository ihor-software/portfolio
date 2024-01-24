import { ApiProperty } from '@nestjs/swagger';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Table, Column, ForeignKey, BelongsTo, Model, AllowNull } from 'sequelize-typescript';
import { Country } from 'src/countries/entities/country.entity';
import { Patient } from 'src/patient';

@Table({ timestamps: false })
export class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
  @ApiProperty({
    description: 'Country code',
    example: 'UA',
    required: true,
  })
  @ForeignKey(() => Country)
  @Column
  country_code: string;

  @ApiProperty({
    description: 'City',
    example: 'Lviv',
    required: true,
  })
  @Column
  city: string;

  @ApiProperty({
    description: 'Street',
    example: 'Soborna',
    required: true,
  })
  @Column
  street: string;

  @ApiProperty({
    description: 'Zip-code',
    example: '123456',
    required: true,
  })
  @Column
  zip_code: string;

  @ApiProperty({
    description: 'Appartment',
    example: '2',
    required: false,
  })
  @AllowNull
  @Column
  appartment?: string;

  @ApiProperty({
    description: 'Patient id',
    example: 5,
    required: true,
  })
  @Column
  @ForeignKey(() => Patient)
  user_id: number;

  @BelongsTo(() => Patient, 'user_id')
  patient: Patient;

  @BelongsTo(() => Country, 'country_code')
  country: Country;
}
