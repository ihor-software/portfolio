import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { SpecialtyService } from './specialty.service';
import { Specialty } from '../entities';

@ApiTags('Specialties')
@Controller('specialties')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @ApiOkResponse({ description: 'List of Specialties', type: [Specialty] })
  @Get()
  findAll() {
    return this.specialtyService.findAll();
  }

  @ApiOkResponse({ description: 'Specialty found successfully', type: Specialty })
  @ApiNotFoundResponse({ description: 'Specialty not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.specialtyService.findOne(id);
  }
}
