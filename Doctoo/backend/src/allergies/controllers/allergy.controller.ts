import { Controller, Get, Query } from '@nestjs/common';
import { AllergyService } from '../services';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Allergy } from '../entities';

@ApiTags('Allergies')
@Controller('allergies')
export class AllergyController {
  constructor(private allergyService: AllergyService) {}

  @ApiOkResponse({
    description: 'List of allergies found by name',
    type: [Allergy],
  })
  @Get()
  findAll() {
    return this.allergyService.findAll();
  }

  @Get(':name')
  findByName(@Query('name') name: string) {
    return this.allergyService.findByName(name);
  }
}
