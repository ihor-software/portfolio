import { ApiProperty } from '@nestjs/swagger';
import { AllowNull, BelongsTo, Column, ForeignKey, IsIn, Model, Table } from 'sequelize-typescript';
import { Appointment } from 'src/appointment';
import { NotificationType } from 'src/constants';

@Table
export class Notification extends Model<Notification> {
  @ApiProperty({
    description: 'Notification type',
    example: 'appointment',
    enum: Object.values(NotificationType),
    enumName: 'NotificationType',
  })
  @IsIn([Object.values(NotificationType)])
  @Column
  public type: string;

  @ApiProperty({ description: 'Appointment id', example: '1' })
  @AllowNull
  @ForeignKey(() => Appointment)
  @Column
  public appointment_id: number;

  @BelongsTo(() => Appointment)
  appointments: Appointment;
}
