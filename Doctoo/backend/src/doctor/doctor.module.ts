import { Module } from '@nestjs/common';
import { Doctor } from './entities';
import { SequelizeModule } from '@nestjs/sequelize';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';

@Module({
  imports: [SequelizeModule.forFeature([Doctor])],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}
