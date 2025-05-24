import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

const moment = require('moment')

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getOrderStats(product_id: number) {
    const orders = await this.prisma.orderItem.findMany({
      where: { productId: product_id },
    });

    let dates: string[] = []
    let quantity: number[] = []
    let cost: number = 0

    for(let i = 0; i < orders.length; i++) {
      if(i > 0 && dates.findIndex(el => (el === moment(orders[i].createdAt).format('DD MM YYYY'))) !== -1) {
        let index = dates.findIndex(el => (el === moment(orders[i].createdAt).format('DD MM YYYY')))
        quantity[index] += orders[index].quantity
      }
      else {
        dates.push(moment(orders[i].createdAt).format('DD MM YYYY'))
        quantity.push(orders[i].quantity)
      }
      cost += orders[i].price * orders[i].quantity
    }

    return {
      dates,
      quantity,
      cost
    };
  }
}
