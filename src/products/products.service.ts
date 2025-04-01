import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PublishProductDto } from './product.dto';
import { RolesTypes } from 'src/common_types/role.type';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getCategories() {
    const categories = await this.prisma.category.findMany({
      include: {
        category_products: {
          omit: { product_categoryId: true },
        },
      },
    });

    return categories;
  }

  async publishProduct(dto: PublishProductDto & { dillerId: number }) {
    const category = await this.prisma.category.findFirst({
      where: {
        category_title: dto.categoryName,
      },
      select: { category_id: true },
    });

    if (!category)
      throw new NotFoundException('Возникли проблемы, каталог не найден');

    const diller = await this.prisma.user.findUnique({
      where: { id: +dto.dillerId },
      omit: {
        id: true,
        password: true,
      },
      include: {
        profile: {
          select: { profile_id: true },
        },
      },
    });

    if (diller && RolesTypes[diller.roleId] !== 'diller')
      throw new ForbiddenException('Нет прав');

    const product = await this.prisma.product.create({
      data: {
        product_content: dto.product_content,
        product_title: dto.product_title,
        product_price: dto.product_price,
        product_value: dto.product_value,
        product_categoryId: category.category_id,
        diller_profileId: diller!.roleId,
      },
    });

    return product;
  }
}
