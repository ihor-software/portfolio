import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Allergy } from '../entities';

@Injectable()
export class AllergyService {
  constructor(@InjectModel(Allergy) private allergyRepository: typeof Allergy) {}

  findAll() {
    return this.allergyRepository.findAll();
  }

  findByName(name: string) {
    return this.allergyRepository.findAll({ where: { name } });
  }
}
