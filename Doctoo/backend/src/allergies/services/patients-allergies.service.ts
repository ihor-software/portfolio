import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePatientsAllergiesDto } from '../dto';
import { PatientsAllergies } from '../entities';

@Injectable()
export class PatientsAllergiesService {
  constructor(
    @InjectModel(PatientsAllergies) private patientsAllergiesRepository: typeof PatientsAllergies,
  ) {}
  private logger = new Logger(PatientsAllergiesService.name);

  create(dto: CreatePatientsAllergiesDto) {
    return this.patientsAllergiesRepository.create(dto);
  }

  async remove(id: number) {
    const patientsAllergies = await this.patientsAllergiesRepository.findByPk(id);
    if (!patientsAllergies) throw new NotFoundException('Patient`s alergy not found');

    this.patientsAllergiesRepository.destroy({ where: { id } });
    this.logger.log('Patient`s allergy deleted');
  }
}
