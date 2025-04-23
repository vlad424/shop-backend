import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { PrismaService } from 'src/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwt.config';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService],
  imports: [
      ConfigModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: getJwtConfig,
      }),
      MulterModule.register({ ...multerOptions, limits: { files: 4 } }),
    ],
})
export class ReviewModule {}
