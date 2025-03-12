import { Body, Controller, Get, HttpCode, Param, Post, Req, Sse, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignInDto, SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';
import { TokenGuard } from 'src/guards/token.duard';
import { interval, map, Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

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

  @Get('googleAuth')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req)
  }

  // @Sse('sse')
  // sse(): Observable<MessageEvent> {
  //   return interval(1000).pipe(map((_) => ({data: {hello: 'world'}})))
  // }
}
