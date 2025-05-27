import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { TokenGuard } from 'src/guards/token.duard';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(TokenGuard)
  @Post('add')
  @HttpCode(201)
  async AddToFavorites(@Req() req, @Body() data: {productId: number}) {
    return this.favoritesService.addToFavorites(data.productId, +req.user.id)
  }

  @UseGuards(TokenGuard)
  @Get('')
  @HttpCode(200)
  async GetFavorites(@Req() req) { 
    return this.favoritesService.getFavorites(+req.user.id)
  }
}
