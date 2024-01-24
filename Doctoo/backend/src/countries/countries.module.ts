import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { Country } from './entities/country.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Country])],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
