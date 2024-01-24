import { Controller, Post, Get, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Chat } from './entities';
import { CreateChatDto } from './dto';
import { ChatService } from './chat.service';

@ApiTags('Chats')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiCreatedResponse({ description: 'Chat created successfully', type: Chat })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  async createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createChat(createChatDto);
  }

  @ApiOkResponse({ description: 'List of chats', type: [Chat] })
  @Get()
  async getAllChats() {
    return this.chatService.getAllChats();
  }

  @ApiOkResponse({ description: 'Check if chat exists', type: Chat })
  @ApiQuery({ name: 'doctor_id', type: Number, required: true })
  @ApiQuery({ name: 'patient_id', type: Number, required: true })
  @Get('verify')
  async verifyChat(@Query('doctor_id') doctorId: number, @Query('patient_id') patientId: number) {
    return this.chatService.verifyChat(doctorId, patientId);
  }

  @ApiOkResponse({ description: 'Get doctors chats', type: [Chat] })
  @Get('/doctor/:doctor_id')
  async getChatsForDoctor(@Param('doctor_id', ParseIntPipe) doctor_id: number) {
    return this.chatService.getChatsForDoctor(doctor_id);
  }

  @ApiOkResponse({ description: 'Select chat', type: Chat })
  @Get('/chat/:chat_id')
  async getSearchChat(@Param('chat_id', ParseIntPipe) chat_id: number) {
    return this.chatService.selectChat(chat_id);
  }
}
