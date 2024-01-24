import { IsOptional, IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSettingsDto {
  @ApiProperty({
    description: 'Is user subscribed to email notifications',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isEmailNotification?: boolean;

  @ApiProperty({
    description: 'Is user enable two-factor authentication',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isTwoFactor?: boolean;

  @ApiProperty({
    description: 'Is user require to approve bill before payment',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isRequiredBillApproval?: boolean;
}
