import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hospital } from '../entities';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';

@Module({
  imports: [SequelizeModule.forFeature([Hospital])],
  controllers: [HospitalController],
  providers: [HospitalService],
})
export class HospitalModule {}
