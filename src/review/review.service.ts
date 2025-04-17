import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReviewDto } from './review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async createReview(data: CreateReviewDto & {review_profileId: number}, files: Array<Express.Multer.File>) {
    const review = await this.prisma.reviews.create({
      data: {
        reivew_content: data.reivew_content,
        reivew_quality: data.reivew_quality,
        review_profileId: +data.review_profileId,
        review_productId: +data.review_productId,
        review_media: [files[0].filename]
      }
    })
    return review
  }
}
