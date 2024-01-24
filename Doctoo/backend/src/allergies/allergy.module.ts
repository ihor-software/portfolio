import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AllergyController, PatientsAllergiesController } from './controllers';
import { Allergy, PatientsAllergies } from './entities';
import { AllergyService, PatientsAllergiesService } from './services';

@Module({
  imports: [SequelizeModule.forFeature([Allergy, PatientsAllergies])],
  controllers: [AllergyController, PatientsAllergiesController],
  providers: [AllergyService, PatientsAllergiesService],
})
export class AllergyModule {}
