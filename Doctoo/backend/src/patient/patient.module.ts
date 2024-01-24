import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from './entities';
import { AllergyModule } from 'src/allergies/allergy.module';
import { MedicalConditionModule } from 'src/medical-conditions';

@Module({
  imports: [SequelizeModule.forFeature([Patient]), MedicalConditionModule, AllergyModule],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
