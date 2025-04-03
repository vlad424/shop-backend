import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { TokenGuard } from 'src/guards/token.duard';
import { PublishProductDto } from './product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(TokenGuard)
  @HttpCode(200)
  @Get('categories')
  async getCategories() {
    return this.productsService.getCategories();
  }

  @UseGuards(TokenGuard)
  @HttpCode(200)
  @Get('')
  async getProducts(@Query() query: {searchText: string}) {
    return this.productsService.getProducts(query.searchText === '' ? undefined : query.searchText)
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(TokenGuard)
  @HttpCode(201)
  @Post('publish')
  async publishProduct(@Req() req, @Body() dto: PublishProductDto) {
    const data = {...dto, dillerId: req.user.id} 

    return this.productsService.publishProduct(data)
  }
}
