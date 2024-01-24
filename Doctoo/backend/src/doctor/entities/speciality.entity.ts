import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Doctor_specialties', timestamps: false })
export class Specialty extends Model<
  InferAttributes<Specialty>,
  InferCreationAttributes<Specialty>
> {
  @Column({ primaryKey: true })
  specialty_id: number;

  @Column
  specialty: string;
}
