import { Injectable, Logger } from '@nestjs/common';
import { Chat } from './entities';
import { InjectModel } from '@nestjs/sequelize';
import { CreateChatDto } from './dto';
import { Op } from 'sequelize';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat) private chatRepository: typeof Chat) {}

  private readonly logger = new Logger(ChatService.name);

  async createChat(createChatDto: CreateChatDto): Promise<Chat> {
    return this.chatRepository.create(createChatDto);
  }

  async verifyChat(doctor_id: number, patient_id: number): Promise<Chat> {
    return this.chatRepository.findOne({
      where: {
        [Op.and]: [{ doctor_id }, { patient_id }],
      },
    });
  }

  async getAllChats(): Promise<Chat[]> {
    return this.chatRepository.findAll();
  }

  async getChatsForDoctor(id: number): Promise<Chat[]> {
    return this.chatRepository.findAll({ where: { doctor_id: id } });
  }

  async selectChat(id: number): Promise<Chat> {
    return this.chatRepository.findOne({ where: { id } });
  }
}
