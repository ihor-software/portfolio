import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MedicalConditionService } from '../services';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MedicalCondition } from '../entities';

@ApiTags('Medical conditions')
@Controller('medical-conditions')
export class MedicalConditionController {
  constructor(private medicalConditionService: MedicalConditionService) {}

  @ApiOkResponse({
    description: 'List of medical conditions found by name',
    type: [MedicalCondition],
  })
  @Get()
  findAll() {
    return this.medicalConditionService.findAll();
  }

  @Get(':name')
  findByName(@Query('name') name: string) {
    return this.medicalConditionService.findByName(name);
  }

  @ApiOkResponse({
    description: 'Create medical condition',
    type: [MedicalCondition],
  })
  @Post()
  create(@Body('name') name: string) {
    return this.medicalConditionService.create(name);
  }
}
