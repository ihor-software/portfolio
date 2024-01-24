import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Country } from './entities/country.entity';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @ApiOkResponse({ description: 'List of countries', type: [Country] })
  @Get()
  findAll() {
    return this.countriesService.findAll();
  }
}
