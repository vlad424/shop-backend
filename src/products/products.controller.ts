import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { TokenGuard } from 'src/guards/token.duard';
import { PublishProductDto } from './product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';

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
  async getProducts(@Query() query: { searchText: string }) {
    return this.productsService.getProducts(
      query.searchText === '' ? undefined : query.searchText,
    );
  }

  @Get(':id')
  async getProduct(@Param() param: { id: string }) {
    return await this.productsService.getProduct(param.id);
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(TokenGuard)
  @HttpCode(201)
  @Post('publish_product')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadimg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: PublishProductDto,
    @Req() req,
  ) {
    const data: PublishProductDto & { dillerId: number } = {
      product_title: body.product_title,
      product_content: body.product_content,
      product_price: body.product_price,
      product_value: body.product_value,
      categoryName: body.categoryName,
      dillerId: req.user.id,
    };

    return this.productsService.publishProduct(data, files);
  }
}
