import { Injectable } from '@nestjs/common';
import { Country } from './entities/country.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CountriesService {
  constructor(@InjectModel(Country) private countryRepository: typeof Country) {}

  async findAll(): Promise<Country[]> {
    return this.countryRepository.findAll();
  }
}
