import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Hospitals', timestamps: false })
export class Hospital extends Model<InferAttributes<Hospital>, InferCreationAttributes<Hospital>> {
  @Column({ primaryKey: true })
  hospital_id: number;

  @Column
  name: string;
}
