import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import JwtAuthenticationGuard from 'src/authentication/guard/jwt-authentication.guard';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Address } from './entities/address.entity';

@ApiTags('Patient address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOkResponse({ description: 'Patient address created successfully', type: Address })
  @ApiNotFoundResponse({ description: 'Patient or country not found' })
  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @ApiOkResponse({ description: 'Patient addresses', type: [Address] })
  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.addressService.findAll(+userId);
  }

  @ApiOkResponse({ description: 'Patient address updated successfully', type: Address })
  @ApiNotFoundResponse({ description: 'Patient or address or country not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @ApiOkResponse({ description: 'Patient address deleted successfully' })
  @ApiNotFoundResponse({ description: 'Address not found' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.addressService.remove(+id);
  }
}
