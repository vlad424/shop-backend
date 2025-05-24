import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { TokenGuard } from 'src/guards/token.duard';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @UseGuards(TokenGuard)
  @HttpCode(200)
  @Get(':id')
  async getOrdersStats(@Param() data: {id: string}) {
    return this.statsService.getOrderStats(+data.id);
  }
}
