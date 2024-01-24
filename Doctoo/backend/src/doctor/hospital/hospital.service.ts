import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hospital } from '../entities';

@Injectable()
export class HospitalService {
  constructor(@InjectModel(Hospital) private hospitalRepository: typeof Hospital) {}

  async findAll(): Promise<Hospital[]> {
    return this.hospitalRepository.findAll();
  }

  async findOne(hospitalId: number): Promise<Hospital | void> {
    const hospital = await this.hospitalRepository.findByPk(hospitalId);
    if (!hospital) {
      throw new NotFoundException('Hospital was not found!');
    }
    return hospital;
  }
}
