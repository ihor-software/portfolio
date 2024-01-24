import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VirtualAssistantController } from './virtual-assistant.controller';
import { VirtualAssistantService } from './virtual-assistant.service';
import { DoctorModule, SpecialtyModule } from 'src/doctor';
import { AppointmentModule } from 'src/appointment';
import { VirtualAssistantChatMessage } from './entities/chat-message.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([VirtualAssistantChatMessage]),
    HttpModule,
    DoctorModule,
    AppointmentModule,
    SpecialtyModule,
  ],
  controllers: [VirtualAssistantController],
  providers: [VirtualAssistantService],
})
export class VirtualAssistantModule {}
