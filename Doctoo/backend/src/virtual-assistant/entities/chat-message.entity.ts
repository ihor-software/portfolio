import { Column, Model, Table, IsIn, DataType, PrimaryKey, Default } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { ApiProperty } from '@nestjs/swagger';

@Table({ timestamps: false })
export class VirtualAssistantChatMessage extends Model<
  InferAttributes<VirtualAssistantChatMessage>,
  InferCreationAttributes<VirtualAssistantChatMessage>
> {
  @ApiProperty({ description: 'User id', example: '1' })
  @Column
  public user_id: string;

  @ApiProperty({ description: 'Role', example: 'user' })
  @IsIn([['user', 'assistant', 'system']])
  @Column
  public role: string;

  @ApiProperty({ description: 'Message', example: 'Hello. I need a family doctor!' })
  @Column({ type: DataType.TEXT })
  public message: string;

  @ApiProperty({ description: 'Is visible', example: 'true' })
  @Column
  public isVisible: boolean;

  @ApiProperty({ description: 'Contains doctors list', example: 'false' })
  @Column
  public containsDoctorsList: boolean;

  @ApiProperty({ description: 'Contains appointments list', example: 'false', default: false })
  @Default(false)
  @Column
  public containsAppointmentsList: boolean;
}
