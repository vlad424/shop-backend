import { Body, Controller, HttpCode, Post, Req, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { TokenGuard } from 'src/guards/token.duard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateReviewDto } from './review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe)
  @Post('create')
  @HttpCode(201)
  @UseGuards(TokenGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async createReview(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: CreateReviewDto, @Req() req) {
    const data: CreateReviewDto & {review_profileId: number} = {
      reivew_content: body.reivew_content,
      reivew_quality: body.reivew_quality,
      review_productId: body.review_productId,
      review_profileId: req.user.id
    }

    return this.reviewService.createReview(data, files)
  }
}
