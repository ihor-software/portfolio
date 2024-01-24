import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ timestamps: false })
export class Country extends Model<InferAttributes<Country>, InferCreationAttributes<Country>> {
  @ApiProperty({
    description: 'Country code',
    example: 'UA',
  })
  @Column({ primaryKey: true })
  code: string;

  @ApiProperty({
    description: 'Country name',
    example: 'Ukraine',
  })
  @Column({})
  name: string;

  @ApiProperty({
    description: 'Country phone code',
    example: '+380',
  })
  @Column({})
  phone_code: string;
}
