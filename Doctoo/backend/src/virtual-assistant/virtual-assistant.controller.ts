import { Body, Controller, Delete, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { PostMesageDto } from './dto/postMessageDto';
import { VirtualAssistantService } from './virtual-assistant.service';
import RequestWithUser from 'src/authentication/interface/requestWithUser.interface';
import JwtAuthenticationGuard from 'src/authentication/guard/jwt-authentication.guard';
import { request } from 'http';

@Controller('virtual-assistant')
export class VirtualAssistantController {
  constructor(private readonly virtualAssistantService: VirtualAssistantService) {}

  @Post('send-message')
  @UseGuards(JwtAuthenticationGuard)
  async sendMessage(@Req() request: RequestWithUser, @Body() postMessageDto: PostMesageDto) {
    return this.virtualAssistantService.getVirtualAssistantResponse(
      request.user.id,
      postMessageDto,
    );
  }

  @Get('messages')
  @UseGuards(JwtAuthenticationGuard)
  async getMessages(@Req() request: RequestWithUser) {
    return this.virtualAssistantService.getChatMessages(request.user.id);
  }

  @Delete('messages')
  @UseGuards(JwtAuthenticationGuard)
  async deleteMessages(@Req() request: RequestWithUser) {
    return this.virtualAssistantService.clearConversation(request.user.id);
  }
}
