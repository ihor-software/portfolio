import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './entities';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [SequelizeModule.forFeature([Review])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
