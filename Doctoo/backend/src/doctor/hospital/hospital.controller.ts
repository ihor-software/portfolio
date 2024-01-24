import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { HospitalService } from './hospital.service';
import { Hospital } from '../entities';

@ApiTags('Hospitals')
@Controller('hospitals')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @ApiOkResponse({ description: 'List of hospitals', type: [Hospital] })
  @Get()
  findAll() {
    return this.hospitalService.findAll();
  }

  @ApiOkResponse({ description: 'Hospital found successfully', type: Hospital })
  @ApiNotFoundResponse({ description: 'Hospital not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hospitalService.findOne(id);
  }
}
