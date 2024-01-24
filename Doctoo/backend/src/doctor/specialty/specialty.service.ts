import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Specialty as Specialty } from '../entities';

@Injectable()
export class SpecialtyService {
  constructor(@InjectModel(Specialty) private specialtyRepository: typeof Specialty) {}

  async findAll(): Promise<Specialty[]> {
    return this.specialtyRepository.findAll();
  }

  async findOne(specialtyId: number): Promise<Specialty | void> {
    const specialty = await this.specialtyRepository.findByPk(specialtyId);
    if (!specialty) {
      throw new NotFoundException('Specialty was not found!');
    }
    return specialty;
  }
}
