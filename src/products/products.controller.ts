import { Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { TokenGuard } from 'src/guards/token.duard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @UseGuards(TokenGuard)
  @HttpCode(200)
  @Get('  ')
  async getCategories() {
    return this.productsService.getCategories()
  }

  @UseGuards(TokenGuard)
  @HttpCode(201)
  @Post('create')
  async publishProduct() {
    
  }
}
