import { User } from '../../user';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Chat } from '../../chat/entities';

@Table
export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
  @ForeignKey(() => Chat)
  @ApiProperty({
    description: 'Chat id',
    example: 12,
  })
  @Column
  chat_id: number;

  @ApiProperty({
    description: 'Message text',
    example: 'test',
  })
  @Column
  message_text: string;

  @ApiProperty({
    description: 'File link',
    example: 'test.png',
  })
  @Column
  file: string;

  @ApiProperty({ description: 'Message Date', example: '12-12-2023T13:00:00' })
  @Column
  timestamp: string;

  @ApiProperty({ description: 'User id', example: 1 })
  @Column
  @ForeignKey(() => User)
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}
