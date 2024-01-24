import { SequelizeExceptionFilter } from '../core/filters/sequelize.exception-filter';
import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSettings } from './entities';
import { PaymentModule } from 'src/payment';

@Module({
  imports: [SequelizeModule.forFeature([User, UserSettings]), PaymentModule],
  controllers: [UserController],
  providers: [UserService, { provide: APP_FILTER, useClass: SequelizeExceptionFilter }],
  exports: [UserService],
})
export class UserModule {}
