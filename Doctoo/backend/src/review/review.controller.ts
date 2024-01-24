import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Review } from './entities';
import { CreateReviewDto, UpdateReviewDto } from './dto';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @ApiOkResponse({ description: 'List of reviews', type: [Review] })
  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @ApiOkResponse({ description: 'Reviews about the specified doctor', type: Review })
  @Get(':doctor_id')
  findByDoctor(@Param('doctor_id', ParseIntPipe) doctor_id: number) {
    return this.reviewService.findByDoctor(doctor_id);
  }

  @ApiCreatedResponse({ description: 'Review created successfully', type: Review })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @ApiOkResponse({ description: 'Review updated successfully', type: Review })
  @ApiNotFoundResponse({ description: 'Review not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateReviewDto) {
    return this.reviewService.update(id, updateUserDto);
  }

  @ApiOkResponse({ description: 'Review deleted successfully' })
  @ApiNotFoundResponse({ description: 'Review not found' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.remove(id);
  }
}
