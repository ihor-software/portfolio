import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MedicalCondition } from '../entities';

@Injectable()
export class MedicalConditionService {
  constructor(
    @InjectModel(MedicalCondition) private medicalConditionRepository: typeof MedicalCondition,
  ) {}

  findAll() {
    return this.medicalConditionRepository.findAll();
  }

  findOne(id: number) {
    return this.medicalConditionRepository.findByPk(id);
  }

  findByName(name: string) {
    return this.medicalConditionRepository.findAll({ where: { name } });
  }

  create(name: string) {
    return this.medicalConditionRepository.create({ name: name });
  }
}
