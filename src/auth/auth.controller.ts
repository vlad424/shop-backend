import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(':id')
  async getUsers(@Param('id') id: number) {
    return this.authService.getUsers(id)
  }
}
