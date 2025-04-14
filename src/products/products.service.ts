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

  async getProduct(productId) {
    const product = await this.prisma.product.findUnique({
      where: { product_id: +productId },
      include: {
        Category: {
          omit: {
            category_id: true
          }
        },
        product_reviews: true,
        product_diller: {
          select: {
            profie_diller_name: true,
            profile_id: true
          }
        }
      },
      omit: {
        product_categoryId: true,
        diller_profileId: true
      }
    });

    if (!product) throw new NotFoundException('Такого товара нет');

    return product;
  }

  async getProducts(searchText: string | undefined) {
    const products = await this.prisma.product.findMany({
      where: {
        product_title: {
          search: searchText,
        },
      },
      include: {
        product_diller: true,
        Category: true,
        product_reviews: true,
      },
      omit: {
        diller_profileId: true,
        product_categoryId: true,
      },
    });

    if (!products) throw new NotFoundException('Товаров не найдено');

    return products;
  }

  async publishProduct(
    dto: PublishProductDto & { dillerId: number },
    files: Array<Express.Multer.File>,
  ) {
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

    let filesPath: Array<Express.Multer.File['path']> = []

    for (let i = 0; i < files.length; i++) {
      filesPath.push(`${files[i].filename}`)
    }

    const product = await this.prisma.product.create({
      data: {
        product_content: dto.product_content,
        product_title: dto.product_title,
        product_price: +dto.product_price,
        product_value: +dto.product_value,
        product_specification: dto.product_specification,
        product_categoryId: category.category_id,

        diller_profileId: diller!.profile!.profile_id,
        product_image:filesPath
      },
    });

    return product;
  }
}
