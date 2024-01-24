import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { User } from './entities';
import JwtAuthenticationGuard from '../authentication/guard/jwt-authentication.guard';
import { Exclude } from 'class-transformer';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthenticationGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ description: 'User created successfully', type: User })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOkResponse({ description: 'List of users', type: [User] })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOkResponse({ description: 'User found successfully', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @ApiOkResponse({ description: 'User updated successfully', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Exclude()
  public currentHashedRefreshToken?: string;
}
