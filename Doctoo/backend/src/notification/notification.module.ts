import { SequelizeExceptionFilter } from '../core/filters/sequelize.exception-filter';
import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Notification } from './entities';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Appointment } from 'src/appointment';

@Module({
  imports: [SequelizeModule.forFeature([Notification, Appointment])],
  controllers: [NotificationController],
  providers: [NotificationService, { provide: APP_FILTER, useClass: SequelizeExceptionFilter }],
  exports: [NotificationService],
})
export class NotificationModule {}
