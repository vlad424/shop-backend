import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { TokenGuard } from 'src/guards/token.duard';
import { createOrderDto } from './order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(TokenGuard)
  @Post('create')
  @HttpCode(201)
  async createOrder(@Req() req, @Body() body: createOrderDto) {
    return this.orderService.createOrder(+req.user.id, body)
  }

  @UseGuards(TokenGuard)
  @Get('')
  @HttpCode(200)
  async getAllOrders(@Req() req) {
    return this.orderService.getAllOrders(+req.user.id)
  }
}
