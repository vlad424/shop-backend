import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('signUp')
  async SignUp(@Body() dto: SignUpDto) {
    return this.authService.SighUp(dto)
  }
}
