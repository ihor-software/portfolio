import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { Specialty } from '../entities';
import { SpecialtyController } from './specialty.controller';
import { SpecialtyService } from './specialty.service';

@Module({
  imports: [SequelizeModule.forFeature([Specialty])],
  controllers: [SpecialtyController],
  providers: [SpecialtyService],
  exports: [SpecialtyService],
})
export class SpecialtyModule {}
