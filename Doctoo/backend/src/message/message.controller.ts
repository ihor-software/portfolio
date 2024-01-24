import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Message } from './entities';
import { CreateMessageDto } from './dto';
import { Express } from 'express';

@ApiTags('Messages')
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiCreatedResponse({ description: 'Message created successfully', type: Message })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: string) {
    return this.messageService.uploadFile(file);
  }

  @ApiCreatedResponse({ description: 'Message created successfully', type: Message })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('create')
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.createMessage(createMessageDto);
  }

  @ApiOkResponse({ description: 'List of messages', type: [Message] })
  @Get()
  async getAllMessages() {
    return this.messageService.getAllMessages();
  }

  @ApiOkResponse({ description: 'List of messages by message', type: [Message] })
  @Get('/chat/:chat_id')
  async getAllMessagesByChat(@Param('chat_id', ParseIntPipe) chat_id: number) {
    return this.messageService.getAllMessagesByChat(chat_id);
  }
}
