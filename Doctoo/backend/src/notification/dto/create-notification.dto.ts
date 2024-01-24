import { IsNotEmpty, IsString, IsIn, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '../../constants';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'Notification type',
    example: 'appointment',
    enum: Object.values(NotificationType),
    enumName: 'NotificationType',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(NotificationType))
  public type: string;

  @ApiProperty({ description: 'Appointment id', example: '1' })
  @IsNumber()
  public appointment_id?: number;
}
