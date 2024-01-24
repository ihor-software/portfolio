import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './task.service';
import { AppointmentModule } from 'src/appointment';
import { NotificationModule } from 'src/notification';
import { AppGateway } from './notification.gateway';

@Module({
  imports: [ScheduleModule.forRoot(), AppointmentModule, NotificationModule],
  providers: [TasksService, AppGateway],
})
export class TaskModule {}
