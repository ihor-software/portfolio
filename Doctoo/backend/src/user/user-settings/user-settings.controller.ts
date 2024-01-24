import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { UserSettingsService } from './user-settings.service';
import { UserSettings } from '../entities';
import { UpdateSettingsDto } from '../dto';

@ApiTags('User-settings')
@Controller('settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @ApiOkResponse({ description: 'Get user configurations', type: [UserSettings] })
  @ApiForbiddenResponse({ description: 'You have no access to this data' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get(':id')
  getUserSettings(@Param('id', ParseIntPipe) id: number) {
    return this.userSettingsService.getUserSettings(id);
  }

  @ApiOkResponse({ description: 'Settings updated successfully', type: UserSettings })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'You have no access to edit this data' })
  @Patch(':id')
  updateSettings(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSettingsDto: UpdateSettingsDto,
  ) {
    return this.userSettingsService.update(id, updateSettingsDto);
  }
}
