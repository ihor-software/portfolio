import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { SummarizationRequestDto } from './dto/summarization-request.dto';
import { SummarizationService } from './summarization.service';

@ApiTags('Summarization')
@Controller('summarization')
export class SummarizationController {
  constructor(private readonly summarizationService: SummarizationService) {}

  @ApiOkResponse({ description: 'Clinical note has been successfully summarized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post()
  async summarize(@Body() summarizationRequestDto: SummarizationRequestDto) {
    return await this.summarizationService.analyzeEntities(summarizationRequestDto);
  }
}
