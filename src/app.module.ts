import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, ProductsModule, OrderModule, ReviewModule, StatsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
