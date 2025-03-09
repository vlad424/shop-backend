import { Body, Controller, Get, HttpCode, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignInDto, SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/role.guard';
import { TokenGuard } from 'src/guards/token.duard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //@UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('signUp')
  async SignUp(@Body() dto: SignUpDto) {
    return this.authService.SignUp(dto)
  }

  @UsePipes(new ValidationPipe())
  @Post('signIn') 
  @HttpCode(200)
  async SignIn(@Body() dto: SignInDto) {
    return this.authService.SignIn(dto)
  }

  @UseGuards(TokenGuard)
  @Post('refreshToken')
  async refreshToken(@Body() data) {
    return data
  }


}
