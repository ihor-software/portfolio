import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './entities';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  imports: [SequelizeModule.forFeature([Chat])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
