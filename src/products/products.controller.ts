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

  @Get(':id')
  async getProduct(@Param() param: {id: string}) {
    return this.productsService.getProduct(param.id)
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(TokenGuard)
  @HttpCode(201)
  @Post('publish')
  async publishProduct(@Req() req, @Body() dto: PublishProductDto) {
    const data = {...dto, dillerId: req.user.id} 

    return this.productsService.publishProduct(data)
  }

  @Post('eh')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadimg(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.productsService.handleFileUpload(files)
  }

  @Get('getImages')
  async getFile(@Param('imagename') image, @Res() res) {
    const response = res.sendFile(image, {root: './public/files'})

    return {
      data: response
    }
  }
}
