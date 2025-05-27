import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async addToFavorites(productId: number, profileId: number) {
    const favoriteExists = await this.prisma.liked.findFirst({
      where: { productId: productId },
    });

    if (favoriteExists) {
      const favoriteProduct = await this.prisma.liked.deleteMany({
        where: {
          productId: productId,
          profileId: profileId,
        },
      });
      return favoriteProduct;
    } else {
      const favoriteProduct = await this.prisma.liked.create({
        data: {
          productId: productId,
          profileId: profileId,
        },
      });

      return favoriteProduct;
    }
  }

  async getFavorites(profileId: number) {
    const favorites = await this.prisma.liked.findMany({
      where: {
        profileId: profileId,
      },
      include: {
        product: true,
      },
    });

    return favorites;
  }
}
