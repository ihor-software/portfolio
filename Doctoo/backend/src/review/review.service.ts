import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './entities';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review) private reviewRepository: typeof Review) {}

  private logger = new Logger(ReviewService.name);

  findAll() {
    return this.reviewRepository.findAll();
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findByPk(id);
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  findByDoctor(doctor_id: number) {
    return this.reviewRepository.findAll({ where: { doctor_id } });
  }

  create(createReviewDto: CreateReviewDto) {
    return this.reviewRepository.create(createReviewDto);
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.findOne(id);

    if (!review) throw new NotFoundException('Review not found');

    const [affectedCount, [updatedReview]] = await this.reviewRepository.update(updateReviewDto, {
      where: { id },
      returning: true,
    });

    if (affectedCount > 0) {
      this.logger.log('Review updated');
    }

    return updatedReview;
  }

  async remove(id: number) {
    const review = await this.findOne(id);

    if (!review) throw new NotFoundException('Review not found');

    review.destroy();
    this.logger.log('Review deleted');
  }
}
