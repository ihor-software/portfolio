import { SequelizeExceptionFilter } from '../core/filters/sequelize.exception-filter';
import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './entities';

@Module({
  imports: [SequelizeModule.forFeature([Appointment])],
  controllers: [AppointmentController],
  providers: [AppointmentService, { provide: APP_FILTER, useClass: SequelizeExceptionFilter }],
  exports: [AppointmentService],
})
export class AppointmentModule {}
