import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MedicalConditionController, PatientsMedicalCondController } from './controllers';
import { MedicalCondition, PatientsMedicalCond } from './entities';
import { MedicalConditionService, PatientsMedicalCondService } from './services';

@Module({
  imports: [SequelizeModule.forFeature([MedicalCondition, PatientsMedicalCond])],
  controllers: [MedicalConditionController, PatientsMedicalCondController],
  providers: [MedicalConditionService, PatientsMedicalCondService],
})
export class MedicalConditionModule {}
