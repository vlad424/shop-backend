import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createOrderDto } from './order.dto';
import { OrderItem } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(id: number, data: createOrderDto) {
    const profile = await this.prisma.user.findUnique({
      where: { id: +id },
      select: { profile: true },
    });

    if (!profile?.profile?.profile_id) throw new BadRequestException('К сожалению профель не найден');

    const order = await this.prisma.order.create({
      data: {
        profileId: profile.profile.profile_id,
        items: {},
      },
      include: {
        items: { include: { product: true } },
      },
    });

    let products: Array<OrderItem> = []

    for(let i = 0; i < data.products.length; i++) {
      const product = await this.prisma.product.findUnique({
        where: {product_id: +data.products[i].productId},
        select: {product_price: true, product_id: true, product_value: true}
      })
      
      if(!product) return 
      
      await this.prisma.product.update({
        where: {product_id: +data.products[i].productId},
        data: {
          product_value: product.product_value - data.products[i].quantity 
        }
      })

      products.push(await this.prisma.orderItem.create({
        data: {
          price: product.product_price,
          quantity: data.products[i].quantity,
          productId: data.products[i].productId,
          orderId: order.id
        },
      }))
    }

    return {
      ...order,
      items: products
    };
  }
}
