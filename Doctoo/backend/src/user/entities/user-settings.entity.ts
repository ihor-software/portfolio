import { ApiProperty } from '@nestjs/swagger';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/user';

@Table({ timestamps: false })
export class UserSettings extends Model<
  InferAttributes<UserSettings>,
  InferCreationAttributes<UserSettings>
> {
  @ApiProperty({
    description: 'User id',
    example: 5,
  })
  @Column({ primaryKey: true })
  @ForeignKey(() => User)
  user_id: number;

  @ApiProperty({
    description: 'Is user subscribed to email notifications',
    example: false,
  })
  @Column({ defaultValue: false })
  isEmailNotification: boolean;

  @ApiProperty({
    description: 'Is user enable two-factor authentication',
    example: true,
  })
  @Column({ defaultValue: false })
  isTwoFactor: boolean;

  @ApiProperty({
    description: 'Is user require to approve bill before payment',
    example: true,
  })
  @Column({ defaultValue: false })
  isRequiredBillApproval: boolean;

  @BelongsTo(() => User)
  user: User;
}
