import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
        status: 'PAYED'
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
          address: data.address,
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

  async getAllOrders(profile_id: number) {
    const user = await this.prisma.user.findUnique({
      where: {id: profile_id, roleId: 2}
    })

    if(!user) throw new NotFoundException('Такого продавца нет')

    const orders = await this.prisma.orderItem.findMany({
      where: {
        product: {
          diller_profileId: profile_id
        },
        order: {
          status: 'PAYED'
        }
      },
      include: {
        product: true,
        order: true
      }
    })

    return orders
  }

  async updateOrderById(order_id: number[]) {
    const order = await this.prisma.$transaction(
      order_id.map((id) => this.prisma.order.update({
        where: {id: id},
        include: {
          items: true
        },
        data: {
          status: 'SHIPPED'
        }
      }))
    )

    return order
  }
}
