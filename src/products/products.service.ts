import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getCategories() {
    const categories = await this.prisma.category.findMany({
      include: {
        category_products: true
      }
    })

    return categories
  }

  async publishProduct() {
    return 0
  }
}
