import { Injectable, Logger } from '@nestjs/common';
import { Message } from './entities';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMessageDto } from './dto';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(@InjectModel(Message) private messageModel: typeof Message) {}

  async uploadFile(file: string): Promise<Message> {
    try {
      const message = new this.messageModel();
      message.file = file;

      return await message.save();
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageModel.findAll();
  }

  async getAllMessagesByChat(chat_id: number): Promise<Message[]> {
    return this.messageModel.findAll({ where: { chat_id } });
  }

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    this.logger.log(`Message ${createMessageDto.chat_id} created`);

    try {
      const message = new Message({
        chat_id: createMessageDto.chat_id,
        message_text: createMessageDto.message_text,
        file: createMessageDto.file,
        timestamp: createMessageDto.timestamp,
        user_id: createMessageDto.user_id,
      });

      return await message.save();
    } catch (error) {
      throw new Error(`Message creation failed: ${error.message}`);
    }
  }
}
