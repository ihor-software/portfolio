import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreatePatientsAllergiesDto } from '../dto';
import { PatientsAllergiesService } from '../services';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PatientsAllergies } from '../entities';

@ApiTags('Patients-Allergies')
@Controller('patients-allergies')
export class PatientsAllergiesController {
  constructor(private patientsAllergiesService: PatientsAllergiesService) {}

  @ApiCreatedResponse({
    description: 'Patient`s allergy created successfully',
    type: PatientsAllergies,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  create(@Body() dto: CreatePatientsAllergiesDto) {
    return this.patientsAllergiesService.create(dto);
  }

  @ApiOkResponse({ description: 'Patient`s allergy deleted successfully' })
  @ApiNotFoundResponse({ description: 'Patient`s allergy not found' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientsAllergiesService.remove(id);
  }
}
