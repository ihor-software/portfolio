import { Module } from '@nestjs/common';
import { UserSettingsController } from './user-settings.controller';
import { UserSettingsService } from './user-settings.service';
import { User, UserSettings } from '../entities';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SequelizeModule.forFeature([UserSettings, User]), ConfigModule],
  controllers: [UserSettingsController],
  providers: [UserSettingsService],
  exports: [UserSettingsService],
})
export class UserSettingsModule {}
